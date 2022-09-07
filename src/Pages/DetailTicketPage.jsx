import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DocumentIcon } from '@heroicons/react/24/outline';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import moment from 'moment';
import 'moment/locale/id';
import { fetchTicketDetail } from '../rtk/features/ticketDetailSlice';
import { patchTicket } from '../rtk/features/ticketDetailSlice';

import ModalComponent from '../components/ModalComponent';
import CommentCard from '../components/CommentCard';
import SnackbarComponent from '../components/SnackbarComponent';

const DetailTicketPage = () => {
  const [comment, setComment] = useState('');
  const [snackbarData, setSnackbarData] = useState({
    isOpen: false,
    message: '',
    type: '',
  });
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const params = useParams();
  const ticket = useSelector((state) => state.ticket);
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const generateRandomId = (len) => {
    return Math.random()
      .toString(36)
      .substring(2, len + 2);
  };

  const handleSubmitComment = () => {
    const data = {
      comments: [
        ...ticket?.data?.comments,
        {
          id: generateRandomId(34),
          message: comment,
          attachment: null,
          date: moment().format('dddd, Do/MM/YYYY - HH:mm'),
          user: {
            id: 2,
            name: 'user',
          },
        },
      ],
    };
    const payload = {
      id: params.id,
      data,
    };
    dispatch(patchTicket(payload));
    setComment('');
  };

  const handleChangeStatus = () => {
    // if (state.status === 'open') {
    //   const dataPayload = {
    //     status: 'pending',
    //   };
    //   const payload = {
    //     id: params.id,
    //     data: dataPayload,
    //   };
    //   dispatch(patchTicket(payload));
    // }
  };

  const downloadFile = (file) => {
    const meta = file.attachment.base64String.substring(
      file.attachment.base64String.indexOf(','),
      0
    );

    const base64String = file.attachment.base64String.substring(
      file.attachment.base64String.indexOf(',')
    );

    const linkSource = `${meta + base64String}`;
    const downloadLink = document.createElement('a');
    const fileName = file.attachment.fileName;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  const renderStatus = (status) => {
    switch (status) {
      case 'open':
        return (
          <span className='text-green-500 bg-green-200 py-1 px-4 text-center inline-block rounded uppercase font-semibold'>
            {status}
          </span>
        );
      case 'pending':
        return (
          <span className='text-yellow-500 bg-yellow-200 py-1 px-4 text-center inline-block rounded uppercase font-semibold'>
            {status}
          </span>
        );
      case 'closed':
        return (
          <span className='text-red-500 bg-red-200 py-1 px-4 text-center inline-block rounded uppercase font-semibold'>
            {status}
          </span>
        );
      default:
        break;
    }
  };

  useEffect(() => {
    dispatch(fetchTicketDetail(params.id));
    handleChangeStatus();
  }, []);

  return (
    <div className='relative py-5 lg:py-10 px-4 flex flex-col items-center'>
      {ticket.isFetching ? (
        <div className='flex justify-center items-center h-[100vh]'>
          <h1 className='font-bold text-2xl'>Loading data ...</h1>
        </div>
      ) : (
        <div className='space-y-4 lg:w-4/6 lg:p-10 lg:bg-slate-100 rounded lg:detail-container-box-shadow'>
          <div className='flex justify-between'>
            <h1 className='text-xl lg:text-4xl font-bold'>
              {ticket.data?.titleReport}
            </h1>

            <span>{renderStatus(ticket?.data?.status)}</span>
          </div>
          <p className='italic lg:text-xl'>By {ticket.data?.fullName}</p>
          <p className='text-sm'>{ticket.data?.date}</p>
          <p className=''>{ticket.data?.descriptionReport}</p>

          {ticket?.data?.attachment ? (
            <div className=''>
              <p className='font-medium text-lg self-start'>Attachment</p>

              <div
                className='w-full lg:w-1/2 xl:w-1/3 h-60 bg-slate-50 border-dashed border-2 border-black flex flex-col justify-center items-center space-y-4 hover:cursor-pointer'
                onClick={(e) => {
                  if (
                    ['bmp', 'jpg', 'jpeg', 'gif', 'png'].includes(
                      ticket?.data?.attachment.extension
                    )
                  ) {
                    handleOpen();
                    setModalData({
                      base64String: ticket?.data?.attachment.base64String,
                      fileName: ticket?.data?.attachment.fileName,
                      extension: ticket?.data?.attachment.extension,
                    });
                  } else {
                    downloadFile(ticket?.data);
                  }
                }}
              >
                <div className='flex flex-col justify-center items-center'>
                  <DocumentIcon className='w-10 h-10 text-gray-500' />
                  <p className='text-center'>
                    {ticket?.data?.attachment.fileName}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className=' font-medium text-lg'>
              <p className='text-center'>No Attachment</p>
            </div>
          )}

          <div className='space-y-4 flex flex-col'>
            {ticket?.data?.status === 'closed' ? null : (
              <>
                <p className='font-medium text-lg'>Add Comment</p>

                <TextareaAutosize
                  aria-label='comment'
                  minRows={1}
                  placeholder='Your message'
                  onChange={(e) => {
                    handleComment(e);
                  }}
                  style={{
                    width: '100%',
                    border: '1px solid lightgray',
                    padding: '10px',
                    resize: 'none',
                  }}
                  value={comment}
                />

                <button
                  onClick={handleSubmitComment}
                  className='lg:w-2/12 lg:self-end comment-btn'
                >
                  Comment
                </button>
              </>
            )}
          </div>

          <div className='space-y-4 flex flex-col'>
            <p className='font-medium text-lg'>Comments</p>
            {ticket?.data?.comments ? (
              ticket?.data?.comments.map((comment, index) => {
                return <CommentCard comment={comment} key={index} />;
              })
            ) : (
              <p className='font-medium text-stone-400 text-center'>
                No comment
              </p>
            )}
          </div>

          <div className='absolute'>
            <ModalComponent
              open={open}
              handleClose={handleClose}
              data={modalData}
            />
          </div>

          <SnackbarComponent
            snackbarData={snackbarData}
            setSnackbarData={setSnackbarData}
          />
        </div>
      )}
    </div>
  );
};

export default DetailTicketPage;
