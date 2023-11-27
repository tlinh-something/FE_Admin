import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { format } from 'date-fns';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';
import { Form, Modal, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useForm } from 'antd/es/form/Form';

// ----------------------------------------------------------------------

export default function CourseTableRow({
  id,
  date,
  description,
  price,
  avatar,
  selected,
  name,
  fetch,
  courseStatus,
  handleClick,
}) {
  const [open, setOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const [form] = useForm();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  // const handleCloseMenu = () => {
  //   axios.delete(`http://167.172.92.40:8080/api/instructor/${id}`);
  //   // window.location.reload();
  //   navigate('/courses');
  //   setOpen(null);
  // };

  const approveCourse = async (courseID) => {
    console.log(courseID);
    await axios.put(`http://167.172.92.40:8080/api/${courseID}/approve`).then((response) => {
      message.success('This course is approved');
    });
    fetch();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (values) => {
    await axios
      .put(`http://167.172.92.40:8080/api/${id}/reject`, {
        reason: values.reason,
        courseID: id,
      })
      .then((response) => {
        message.success('This course is rejected');
      });
    setIsModalOpen(false);
    fetch();
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell> */}
        <TableCell>
          <img
            src={
              avatar ||
              'https://th.bing.com/th/id/R.34852e2b6e117af5cbb1af009319e292?rik=uXyTqlmPFqtFsQ&pid=ImgRaw&r=0'
            }
          />
        </TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>
        {/* <TableCell>{company}</TableCell> */}
        <TableCell>{format(new Date(date), 'MM/dd/yyyy')}</TableCell>{' '}
        <TableCell>{description}</TableCell>
        <TableCell>{price}$</TableCell>
        <TableCell>
          <RenderColorStatus colorStatus={courseStatus} />
          {/* <Button onClick={showModal} color='warning'>Verify</Button> */}
          {/* <Label color={courseStatus === 'ACTIVE' ? 'success' : 'warning'}>{courseStatus}</Label> */}
        </TableCell>
        <TableCell>
          {courseStatus === 'VERIFY' && (
            <>
              <Button color="success" onClick={() => approveCourse(id)}>
                Approve
              </Button>
              {/* <Button color="error" onClick={() => rejectCourse(id)}> */}
              <Button color="error" onClick={showModal}>
                Reject
              </Button>
            </>
          )}
        </TableCell>
        {/* <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell> */}
      </TableRow>

      <Modal title="Reason?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Reason"
            name="reason"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message:
                  'Please give at least one reason why you reject this course for instructor',
              },
            ]}
          >
            <TextArea placeholder="What is the reason you reject this course?" rows={3} />
            {/* <textarea /> */}
          </Form.Item>
        </Form>
      </Modal>

      {/* <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover> */}
    </>
  );
}

CourseTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  company: PropTypes.any,
  handleClick: PropTypes.func,
  isVerified: PropTypes.any,
  name: PropTypes.any,
  date: PropTypes.any,
  role: PropTypes.any,
  email: PropTypes.any,
  description: PropTypes.any,
  price: PropTypes.any,
  selected: PropTypes.any,
  avatar: PropTypes.any,
  status: PropTypes.string,
};

const RenderColorStatus = ({ colorStatus }) => {
  if (colorStatus === 'REJECT') {
    return <Label color="error">REJECT</Label>;
  }
  if (colorStatus === 'VERIFY') {
    return <Label color="warning">VERIFY</Label>;
  }
  if (colorStatus === 'ACTIVE') {
    return <Label color="success">ACTIVE</Label>;
  }
  if (colorStatus === 'DEACTIVE') {
    return <Label color="primary">DEACTIVE</Label>;
  }
  return <></>;
};
