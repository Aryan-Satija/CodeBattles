const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const CourseProgress = require("../models/CourseProgress");
exports.createCourse = async (req, res) => {
	try {
		const userId = req.user.id;
		let {
			courseName,
			courseDescription,
			whatYouWillLearn,
			price,
			tag,
			category,
			status,
			instructions,
		} = req.body;
		tag = tag.split(',');
		instructions = instructions.split(',');
		const thumbnail = req.files.thumbnailImage;
		if (
			!courseName ||
			!courseDescription ||
			!whatYouWillLearn ||
			!price ||
			!tag ||
			!thumbnail
		) {
			return res.status(400).json({
				success: false,
				message: "All Fields are Mandatory",
			});
		}
		if (!status || status === undefined) {
			status = "Draft";
		}
		let instructorDetails = await User.findById(userId,{
			accountType: "Instructor",
		});
		console.log(instructorDetails);
		if (!instructorDetails) {
			return res.status(404).json({
				success: false,
				message: "Instructor Details Not Found",
			});
		}
		const thumbnailImage = await uploadImageToCloudinary(
			thumbnail,
			process.env.FOLDER_NAME
		);
		console.log(thumbnailImage);
		const newCourse = await Course.create({
			courseName,
			courseDescription,
			instructor: userId,
			whatYouWillLearn: whatYouWillLearn,
			price,
			tag: tag,
			category: category,
			thumbnail: thumbnailImage.secure_url,
			status: status,
			instructions: instructions,
		});
		await User.findByIdAndUpdate(
			{
				_id: instructorDetails._id,
			},
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ new: true }
		);
		await Category.findByIdAndUpdate(
			{ _id: category },
			{
				$push: {
					course: newCourse._id,
				},
			},
			{ new: true }
		);
		res.status(200).json({
			success: true,
			data: newCourse,
			message: "Course Created Successfully",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Failed to create course",
			error: error.message
		});
	}
};

exports.getAllCourses = async (req, res) => {
	try {
		const allCourses = await Course.find(
			{},
			{
				courseName: true,
				price: true,
				thumbnail: true,
				instructor: true,
				ratingAndReviews: true,
				studentsEnrolled: true,
			}
		)
			.populate("instructor")
			.exec();
		return res.status(200).json({
			success: true,
			data: allCourses,
		});
	} catch (error) {
		console.log(error);
		return res.status(404).json({
			success: false,
			message: `Can't Fetch Course Data`,
			error: error.message,
		});
	}
};
exports.publishCourse = async(req, res)=>{
	try{	
		const {courseId, category} = req.body;
		if(!courseId || !category){
			return res.status(404).json({
			   success: false, 
			   message: "Target Course's Id missing"
		   })
		}
		const response = await Course.findByIdAndUpdate(courseId, {
			status: "Published"
		}, {new: true});
		await Category.findOneAndUpdate({name:category}, {
			$push:{
				courses:courseId
			}
		})
		return res.status(200).json({
			success: true,
			message: "Course Published Successfully"
		})
	} catch(err){
		return res.status(500).json({
			success: false,
			error: err.message,
			message: 'Something went wrong'
		})
	}
}
exports.getAllInstructorCourses = async(req, res)=>{
	try{
		const {instructorId} = req.body;
		const userData = await User.findById(instructorId)
								.populate({
									path:"courses",
									populate:{
										path:"courseContent",
										populate:{
											path: "subSection"
										}
									}
								})
								.exec();
		if(!userData){
			return res.status(401).json({
				success: false,
				message: "Instructor Not Found"
			})
		}
		return res.status(200).json({
			success: true,
			courses: userData.courses
		})
	} catch(err){
		return res.status(500).json({
			success: false,
			message: 'Couldn\'t fetch data',
			error: err.message 
		})
	}
}
exports.getCourseDetails = async(req, res) => {
    try {
        const {courseId} = req.body;
        const courseDetails = await Course.find(
                                    {_id:courseId})
                                    .populate(
                                        {
                                            path:"instructor",
                                            populate:{
                                                path:"additionalDetails",
                                            },
                                        }
                                    )
                                    .populate("category")
                                    .populate({
                                        path:"courseContent",
                                        populate:{
                                            path:"subSection",
                                        },
                                    })
                                    .exec();
        if(!courseDetails) {
            return res.status(400).json({
                success:false,
                message:`Could not find the course with ${courseId}`,
            });
        }
        return res.status(200).json({
            success:true,
            message:"Course Details fetched successfully",
            updatedCourse:courseDetails,
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}
exports.deleteCourse = async(req, res)=>{
	try{
		const {courseId, instructorId} = req.body;
		await Course.findByIdAndDelete(courseId);
		await User.findByIdAndUpdate({_id :instructorId}, 
									{
										$pull:{
											courses: courseId
										}
									})
		return res.status(200).json({
			success: true,
			message: "Course Deleted Successfully"
		})
	} catch(err){
		return res.status(500).json({
			success: false,
			message: "Something Went Wrong",
			error: err.message
		})
	}
}
exports.getFullCourseDetails = async(req, res)=>{
	try{
		const {courseId} = req.body;
		const userId = req.user.id;
		if(!userId || !courseId){
			return res.status(400).json({
				success: false,
				message: "All fields are required"
			})
		} 
		const courseDetails = await Course.findOne({ _id: courseId})
			.populate({
			  path: "instructor",
			  populate: {
				path: "additionalDetails",
			  },
			})
			.populate("category")
			.populate("ratingAndReviews")
			.populate({
			  path: "courseContent",
			  populate: {
				path: "subSection",
			  },
			})
			.exec()
		let courseProgressCount = await CourseProgress.findOne({
			courseId: courseId, 
			userId: userId
		});
		if(!courseProgressCount){
			return res.status(200).json({
				success: true,
				courseDetails,
				completedVideos: []
			})
		}
		return res.status(200).json({
			success: true,
			courseDetails,
			completedVideos: courseDetails.completedVideos
		})
	} catch(err){
		return res.status(500).json({
			success: false,
			error: err.message,
			message: "Something went wrong"
		})
	}
}