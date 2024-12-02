const mysql = require('mysql2/promise');

exports.handler = async (event) => {
  let connection;
  
  try {

    connection = await mysql.createConnection({
      host: process.env.RDS_HOST,
      user: process.env.RDS_USER,
      password: process.env.RDS_PASSWORD,
      database: process.env.RDS_DATABASE,
    });

    // Get course IDs from the event payload
    const courseIds = event.Payload.payload.coursesIds;

    const [result] = await connection.execute(
      `
      UPDATE courses
      SET enable_course = 1
      WHERE id IN (${courseIds.map(() => '?').join(',')})
      `,
      courseIds
    );

    await connection.end();

    // Return success response
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Courses updated successfully.',
        affectedRows: result.affectedRows,
      }),
    };
  } catch (error) {
    // Handle any error that occurs during the process
    console.error('Error updating courses:', error);

    // Ensure the connection is closed if an error occurs
    if (connection) {
      await connection.end();
    }

    // Return an error response
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to update courses.',
        error: error.message,
      }),
    };
  }
};
