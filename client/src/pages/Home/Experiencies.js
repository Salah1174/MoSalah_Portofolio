import React from 'react'
import SectionTitle from '../../components/SectionTitle'
import { experiences } from '../../resources/experiences'

function Experiencies() {
    const [selectedItemIndex, setSelectedItemIndex] = React.useState(null);
    return (
        <div>
            <SectionTitle title="Experience" />
            <div className="flex py-10 gap-10 sm:flex-col">
                <div className='flex flex-col gap-10 border-l-2 border-[#134e4c82] w-1/3 sm:flex-row sm-overflow-x-scroll sm-w-full'>
                    {experiences.map((experience, currentIndex) => (
                        <div onClick={() => {
                            setSelectedItemIndex(currentIndex)
                        }} className='cursor-pointer'>
                            <h1 className={`text-xl px-5 ${selectedItemIndex === currentIndex ? 'text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#134e4c82] py-3' : 'text-white'}`}>{experience.period}</h1>
                        </div>
                    ))}

                </div>

                <div className='flex flex-col gap-5'>
                    {selectedItemIndex !== null && (
                        <>
                            <h1 className='text-secondary text-xl'>
                                {experiences[selectedItemIndex].title}
                            </h1>
                            <h1 className='text-secondary text-xl'>{experiences[selectedItemIndex].company}</h1>
                            <h1 className='text-tertiary text-xl'>
                                <p className='text-white'>
                                    Loren ipsum
                                </p>
                            </h1>
                        </>
                    )}
                </div>


            </div>
        </div >
    )
}

export default Experiencies