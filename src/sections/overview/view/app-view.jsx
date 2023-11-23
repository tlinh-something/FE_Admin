import { faker } from '@faker-js/faker';
import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';
import { useEffect, useState } from 'react';
import axios from 'axios';

// ----------------------------------------------------------------------

export default function AppView() {
  const [count, setCount] = useState({ learnerCount: 0, instrucCount: 0,courseCount: 0});
  const [enrollCount,setEnrollCount] = useState({enrollCount: 0});
const fetchCount = () =>{
  axios.get('http://167.172.92.40:8080/api/admin/count')
  .then(response => {
    const { learnerCount, instrucCount,courseCount } = response.data;
    setCount({ learnerCount, instrucCount,courseCount });
  })
  .catch(error => {
    console.error(error);
  });
}
const fetchEnrollment = () =>{
  axios.get('http://167.172.92.40:8080/api/enrollments').then(res=>{
     setEnrollCount(res.data.length);
  })
  
}
const [date,setDate] = useState([]);
// const fetchTestData = () => {
//   axios.get('http://167.172.92.40:8080/api/test')
//     .then(response => {
//       const filteredData = response.data.filter(item => {
//         const date = new Date(item.date);
//         const year = date.getFullYear();
//         const month = date.getMonth() + 1; // Adding 1 to match the format "2023-11"

//         const formattedDate = `${year}-${month < 10 ? '0' + month : month}`;

//         return formattedDate === '2023-11'; // Filtering for November 2023
//       });

//       console.log("Filtered data:", filteredData);
//     })
//     .catch(error => {
//       console.log("Error:", error);
//     });
// }

const [beginner, setBeginner] = useState([]);
const [intermediate, setIntermediate] = useState([]);
const [advanced, setAdvanced] = useState([]);
const [expert, setExpert] = useState([]);

const [courseLevel,setCourseLevel] = useState([]);
const fetchCountCourse=()=>{
  axios.get('http://167.172.92.40:8080/api/count-by-level').then(res=>{
    setCourseLevel(res.data);
    
  })
}
const nums = courseLevel.map(item => item[1]);
const num1 = nums[0];
const num2 = nums[1];
const num3 = nums[2];
let num4 = nums[3];
if(num4==null) num4 = 0; 

const [courseNumber, setCourseNumber] = useState([]);
const fetchCourseNumber=()=>{
    axios.get('http://167.172.92.40:8080/api/courses').then(res=>{
      setCourseNumber(res.data.length);
    })
}

useEffect(()=>{
  fetchCount();
  fetchEnrollment();
  fetchCountCourse();
  fetchCourseNumber();
},[]);
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
         Welcome back, ADMIN
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Learners"
            total={count.learnerCount}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Instructors"
            total={count.instrucCount}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Item Orders"
            total={enrollCount}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Number of Courses"
            total={count.courseCount}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Course enrollments"
            subheader="for each month"
            chart={{
              labels: [
                '01/01/2023',
                '02/01/2023',
                '03/01/2023',
                '04/01/2023',
                '05/01/2023',
                '06/01/2023',
                '07/01/2023',
                '08/01/2023',
                '09/01/2023',
                '10/01/2023',
                '11/01/2023',
                '12/01/2023',
                
              ],
              series: [
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [1, 3, 5, 2, 6, 11, 6, 8, 15, 12, 11,9],
                },
               
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Courses based on Level"
            chart={{
              series: [
                { label: 'Advance', value:num1 },
                { label: 'Beginner', value: num2 },
                { label: 'Expert', value: num3 },
                { label: 'Intermediate', value: num4 },
              ],
            }}
          />
        </Grid>

        
     
       

        

        

      </Grid>
    </Container>
  );
}
