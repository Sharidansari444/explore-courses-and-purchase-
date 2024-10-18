import axios from 'axios'
import React, { useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const CreateCourse = () => {
    const navigate = useNavigate()
    const [image, setImage] = useState([null])
    const [inputdata, setInputdata] = useState({

        title: "",
        description: "",
        category: "",
        createdBy: "",
        thumbnail: "",
        // previewImage: ""


    })

    function thumbnailImageUpload(e) {
        e.preventDefault()
        const imageupload = e.target.files[0]
        if (imageupload) {
            setInputdata({
                ...inputdata,
                thumbnail: imageupload

            })

            const fileReader = new FileReader();
            fileReader.readAsDataURL(imageupload)
            fileReader.addEventListener("load", function () {
                console.log(this.result)
                setImage(this.result)
            })
        }
       
    }

    function handleInputdata(e) {
        const { name, value } = e.target;
        setInputdata({
            ...inputdata,
            [name]: value
        })

    }

    const onFormSubmit = async (e) => {
        e.preventDefault()
        if (!inputdata.title || !inputdata.description || !inputdata.category || !inputdata.createdBy || !inputdata.thumbnail) {
            toast.error("please fill the all fields")
            return;
        }
        console.log(inputdata)
        await axios.post("http://localhost:5000/api/course/createcourse", inputdata, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((res) => {
            console.log(res)
            toast.success("Course create Successfully")
            navigate("/Courses")
            
        }).catch((error)=>{
            console.log(error)
        })


    }

    return (
        <div>
            <div className=' bg-dark w-100 h-100 d-flex  justify-content-center align-items-center'>
                <div className=' w-50 h-50  border border-light text-light'>

                    <form onSubmit={ onFormSubmit} >

                        <div className=" mx-2 my-2 w-100 h-100 d-flex  ">
                            <div className='w-50 h-100 '>
                                <label htmlFor="image_uploads" >

                                    {image ? (
                                       
                                        
                                        <img className='w-100 h-50  ' src={image} alt="profile" />
                                    ) : (
                                        <FaRegUserCircle className=' w-100 h-50 pointer-event   ' />

                                    
                                    )

                                    }
                                </label>
                                <input
                                    onChange={thumbnailImageUpload}

                                    type="file"
                                    className='d-none'
                                    id='image_uploads'
                                    name='image_uploads'
                                     autoComplete='off'
                                    accept='.jpg , .png , .jpeg .svg'
                                />

                                <div>
                                    <h5 className='mt-4 ' >Course title</h5>
                                    <input
                                     className='text-light w-100 bg-transparent border-light border '
                                      type="text" 
                                      name='title'
                                      placeholder='title'
                                       autoComplete='off'
                                      onChange={handleInputdata}
                                       />

                                </div>
                            </div>
                            <div className='w-50 mx-5'>

                                <div >
                                    <h5 className='my-1'> Course Createdby</h5>
                                    <input
                                        className='text-light w-100 bg-transparent border-light border'
                                        name='createdBy'
                                        type="text "
                                         autoComplete='off'
                                        placeholder='title' 
                                        onChange={handleInputdata}
                                        />

                                </div>
                                <div >
                                    <h5 className='my-1' >Course  category </h5>
                                    <input
                                        className=' text-light w-100 border bord  bg-transparent'
                                        name='category'
                                        type="text"
                                        placeholder='category'
                                        onChange={handleInputdata}
                                         />

                                </div>
                                <div >
                                    <h5 className='my-2'> Course description</h5>
                                    <textarea
                                        type="text"
                                        name='description'
                                        placeholder='enter your description '
                                        className=' text-light w-100 bg-transparent text-light border-light'
                                        onChange={handleInputdata}

                                    />


                                </div>

                                <div className="mt-4">
                                    <button className=' btn btn-outline-warning form-control'>click</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default CreateCourse