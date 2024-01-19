import {useState} from 'react'
import Axios from 'axios'

export default function Upload() {

  const [previewImage, setPreviewImage] = useState(undefined);
  const [fileImage, setFileImage] = useState(undefined);

  function onUpload() {
    if (!fileImage) {
      console.log("Please select an image first")
    } else {

      var formdata = new FormData()

      var Headers = {
        header: {
          'Content-Type': 'multipart/form-data',
        }
      }

      console.log("file image")
      console.log(fileImage)

      formdata.append('image', fileImage)

      Axios.post("api_url/uploadimage", formdata, Headers)
      .then( (uploaded) => {
        console.log("upload succeed")
      })
      .catch( (err) => {
        console.log(err)
      })
    }
  }

  return (
    <div>

      <div
        onDragEnter={(e)=>{
          e.stopPropagation()
          e.preventDefault()
        }}
        onDragOver={(e)=>{
          e.stopPropagation()
          e.preventDefault()
        }}
        onDrop={(e) => {
          e.stopPropagation()
          e.preventDefault()
          var files=e.dataTransfer.files
            if(files){
                // this.setState({filepaymentproof:files[0],uploadid:transaction.idtransaction})
                setFileImage(files[0])
                var reader=new FileReader()
                reader.onload=(e)=>{
                    // this.setState({previewimage:e.target.result})
                    setPreviewImage(e.target.result)
                    console.log(e.target.result)
                }
                reader.readAsDataURL(files[0])
            }
        }}
        style={{
          background: "rgba(0,0,0,.1)",
          padding: "30px",
          // height: "200px"
        }}
      >
        <div
          style={{
            height: "600px",
            padding: "20px",
            border: "dashed 4px rgba(0,0,0,.5)",
            // borderStyle: "dashed",
          }}
        >
          <div
            style={{
              margin: '1em 0',
              fontSize: '21px',
              fontWeight: 'bolder',
              color: 'rgba(0,0,0,.6)',
            }}
          >
            Drag and drop your image
          </div>
          <div
            style={{
              marginBottom: '1em',
              fontSize: '21px',
              fontWeight: 'bolder',
              color: 'rgba(0,0,0,.6)',
            }}
          >
            Or
          </div>

          <input
            type='file'
            style={{
              textAlign: 'center',
            }}
            onChange={ (e) => {
              if(e.target.files){
                setFileImage(e.target.files[0])
                var reader = new FileReader()
                reader.onload = (e) => {
                  setPreviewImage(e.target.result)
                }
                reader.readAsDataURL(e.target.files[0])
              }
            }}
          />
          {
            previewImage?
            <>
              <div
                style={{
                  marginTop: '2em',
                  marginBottom: '1em'
                }}
              >
                Preview
              </div>
              <img src={previewImage} size='small'
                style={{
                  maxWidth: '400px',
                }}
              />
            </>
            : null
          }

          <div
            style={{
              marginTop: '3rem',
            }}
          >
            <button
              disabled={!previewImage}
              style={{
                width: '100px',
                height: '30px',
              }}
            >
              Upload
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}