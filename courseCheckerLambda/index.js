const mysql = require('mysql2/promise');

exports.handler = async (event) => {
  const connection = await mysql.createConnection({
    host: process.env.RDS_HOST,
    user: process.env.RDS_USER,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DATABASE,
  });

  try {
    // Query to get enabled courses (enable_course = 0) and check if the course runtime is available
    const [courses] = await connection.execute(`
      SELECT c.id, cr.runtime_date
      FROM courses c
      INNER JOIN course_runtimes cr ON c.id = cr.course_id
      WHERE c.enable_course = 0 AND cr.start_date >= CURDATE()
    `);

    // Create a list of primary keys for the courses that meet the criteria
    const coursePKs = courses.map(course => course.course_id);

    // Close the connection
    await connection.end();

    // Return the result
    return {
      statusCode: 200,
      body: JSON.stringify({ enabledCoursePKs: coursePKs }),
    };
  } catch (error) {
    console.error('Error executing query:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to fetch data', error: error.message }),
    };
  }
};
