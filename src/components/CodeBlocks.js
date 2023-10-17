import { TypeAnimation } from 'react-type-animation';
import CTAbutton from "./CTAbutton";
import { motion } from 'framer-motion';
function CodeBlocks({type, position, title, body, CTAbtn1, CTAbtn2, color1, color2, color3}){
    return (<motion.div initial={type == 1 ? {x:-800} : {x:800}} whileInView={{opacity:1, x:0, y:0, transition:{damping:2}}} className={`flex ${position} w-full justify-between my-16 gap-16`}>
        <div className='w-full md:w-[45%]'>
            {
                title
            }
            <div className="text-sm mt-4 font-semibold text-richblack-300 max-w-[800px]">{body}</div>
            <div className="flex gap-6 mt-4 mx-auto justify-between md:justify-start">
                <CTAbutton linkTo={'/signup'} yellow={true}>{CTAbtn1.content}</CTAbutton>
                <CTAbutton linkTo={'/login'} yellow={false}>{CTAbtn2.content}</CTAbutton>
            </div>
        </div>
        <div className='w-full md:w-[45%] relative flex gap-4 items-start'>
            <div>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div>8</div>
                <div>9</div>
                <div>10</div>
                <div>11</div>
                <div>12</div>
            </div>
            <TypeAnimation
                sequence={[
                    '<!DOCTYPE html>\n<html>\n<head><title>Example</title><link rel="stylesheet" href="styles.css"></head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav><a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a></nav>\n</body>\n</html>',
                    1000,
                    ''
                ]}
                cursor={true}
                omitDeletionAnimation={true}
                style={{
                    whiteSpace: 'pre-line',
                }}
                repeat={Infinity}
            />
            <div style={{
                borderRadius: '372px',
                opacity: '0.2',
                background: `var(--gradient-02, linear-gradient(124deg, ${color1} -6.46%, ${color2} 59.04%, ${color3} 124.53%))`,
                filter: 'blur(34px)',
                width: '372px',
                height: '257px',
                position: 'absolute',
                left: '-3.2px',
                top: '-5px'
            }}>
            </div>
        </div>
    </motion.div>)
}
export default CodeBlocks;