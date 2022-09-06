import React, { useRef, useState } from 'react';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { DocumentIcon } from '@heroicons/react/24/outline';

const FileUploader = ({
  attachment,
  setAttachment,
  type,
  setFiles,
  setBase64,
  clearAttachment,
}) => {
  const [file, setFile] = useState(null);
  const [inputFileMsg, setInputFileMsg] = useState('');
  // const [fileSelected, setFileSelected] = useState(null);

  const hiddenFileInput = useRef(null);

  const regex = /\/.*$/gm;

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const fileToBase64 = (file, cb) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(null, reader.result);
    };
    reader.onerror = function (error) {
      cb(error, null);
    };
  };

  const handleChange = (event) => {
    const fileSelected = event.target.files[0];
    const fileName = fileSelected.name;

    console.log(fileSelected);

    const extension = fileName.substring(fileName.indexOf('.') + 1);

    if (fileSelected.size < 3000000) {
      setFile(fileSelected);

      setFiles({ type: type, image: fileSelected });

      fileToBase64(fileSelected, (err, result) => {
        if (result) {
          setBase64(result);

          setAttachment({
            fileName: fileSelected.name,
            extension: extension,
            base64String: result,
          });

          return result;
        }
      });
    } else {
      // setIsSingleModalOpen(true);
      // setModalData({
      //   message: 'Ukuran File Tidak Bisa Lebih Besar Dari 3 Mb',
      //   positiveText: 'Mengerti',
      //   type: 'Error',
      // });
    }
  };

  const handleClear = () => {
    setFile(null);
    // setAttachment(null);
  };

  return (
    <>
      <div className='w-full h-60 bg-[#F7F9F9] border-dashed border-2 border-darkGreen flex flex-col justify-center items-center space-y-4'>
        <div className='flex flex-col justify-center items-center'>
          {!file ? (
            <div
              className='cursor-pointer hover:text-green ease-in duration-100'
              onClick={(e) => {
                e.preventDefault();
                handleClick();
              }}
            >
              <ArrowUpTrayIcon
                width={40}
                height={40}
                className='cursor-pointer hover:text-green ease-in duration-100'
              />
              <span className='cursor-pointer font-bold hover:text-green ease-in duration-100'></span>
            </div>
          ) : (
            <>
              <DocumentIcon width={50} height={50} />
              <p className='text-center'>{file.name}</p>
            </>
          )}
        </div>
        <input
          ref={hiddenFileInput}
          onChange={handleChange}
          onClick={(e) => {
            hiddenFileInput.current.value = null;
          }}
          type='file'
          name='studentPhoto'
          id='studentPhoto'
          className='hidden'
        />
      </div>
      <div className='flex justify-between'>
        {/* <p>Menerima file dalam bentuk pdf, jpg, jpeg, png</p> */}
        {file ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              handleClear();
            }}
          >
            Clear file
          </button>
        ) : null}

        {inputFileMsg !== '' ? <span>File is too big</span> : null}
      </div>
    </>
  );
};

export default FileUploader;
