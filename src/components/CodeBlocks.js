import { TypeAnimation } from 'react-type-animation';
import CTAbutton from "./CTAbutton";
function CodeBlocks({position, title, body, CTAbtn1, CTAbtn2, color1, color2, color3}){
    return (<div className={`flex ${position} w-full justify-between my-16`}>
        <div className='w-[45%]'>
            {
                title
            }
            <div className="text-sm mt-4 font-semibold text-richblack-300 max-w-[800px]">{body}</div>
            <div className="flex gap-6 mt-4">
                <CTAbutton linkTo={'/signup'} yellow={true}>{CTAbtn1.content}</CTAbutton>
                <CTAbutton linkTo={'/login'} yellow={false}>{CTAbtn2.content}</CTAbutton>
            </div>
        </div>
        <div className='w-[45%] relative'>
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
    </div>)
}
export default CodeBlocks;