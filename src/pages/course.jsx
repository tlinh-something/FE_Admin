import { Helmet } from 'react-helmet-async';

import { CourseView } from 'src/sections/course';

// ----------------------------------------------------------------------

export default function CoursePage() {
  return (
    <>
      <Helmet>
        <title> Blog </title>
      </Helmet>

      <CourseView />
    </>
  );
}
