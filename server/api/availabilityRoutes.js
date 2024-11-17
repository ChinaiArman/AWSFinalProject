import express from "express";
import FacultyAvailability from '../models/FacultyAvailability.js';

import { isSignedIn, isVerified, isStudent, isFaculty, isAdmin } from "../config/authConfig.js";


// CONSTANTS
const availabilityRoutes = express.Router();


// ROUTES
availabilityRoutes.post('/add', async (req, res) => {
    const { facultyId, day, startTime, endTime, available } = req.body;

    try {
        const newAvailability = await FacultyAvailability.create({
            faculty_id: facultyId,
            day,
            start_time: startTime,
            end_time: endTime,
            available
        });

        res.status(201).json({ message: 'Availability added successfully', newAvailability });
    } catch (error) {
        console.error('Error adding availability:', error);
        res.status(500).json({ error: error.message });
    }
});

availabilityRoutes.get('/:facultyId', async (req, res) => {
    const { facultyId } = req.params;

    try {
        const availabilities = await FacultyAvailability.findAll({
            where: { faculty_id: facultyId }
        });

        if (availabilities.length === 0) {
            return res.status(404).json({ message: 'No availability found for this faculty member' });
        }

        res.status(200).json(availabilities);
    } catch (error) {
        console.error('Error fetching availability:', error);
        res.status(500).json({ error: error.message });
    }
});

availabilityRoutes.put('/update', async (req, res) => {
    const { facultyId, day, startTime, endTime, available } = req.body;

    try {
        const [updatedRows] = await FacultyAvailability.update(
            { available },
            {
                where: {
                    faculty_id: facultyId,
                    day,
                    start_time: startTime,
                    end_time: endTime
                }
            }
        );

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'No matching availability found to update' });
        }

        res.status(200).json({ message: 'Availability updated successfully' });
    } catch (error) {
        console.error('Error updating availability:', error);
        res.status(500).json({ error: error.message });
    }
});

availabilityRoutes.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRows = await FacultyAvailability.destroy({
            where: { id }
        });

        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Availability not found' });
        }

        res.status(200).json({ message: 'Availability deleted successfully' });
    } catch (error) {
        console.error('Error deleting availability:', error);
        res.status(500).json({ error: error.message });
    }
});


// PUT
availabilityRoutes.put('/:facultyId', async (req, res) => {
    const { facultyId } = req.params;
    const { availability } = req.body;

    try {
        // Delete existing availability entries for the faculty
        await FacultyAvailability.destroy({
            where: { faculty_id: facultyId },
        });

        // Bulk insert new availability entries
        const newAvailabilities = availability.map((entry) => ({
            faculty_id: facultyId,
            day: entry.day,
            start_time: entry.start_time,
            end_time: entry.end_time,
            available: entry.available,
        }));

        await FacultyAvailability.bulkCreate(newAvailabilities);

        res.status(200).json({ message: 'Availability updated successfully' });
    } catch (error) {
        console.error('Error updating availability:', error);
        res.status(500).json({ error: error.message });
    }
});

availabilityRoutes.post('/getFacultyAvailableAtTimeSlots', async (req, res) => {
    const db = req.db;
    const { timeSlots } = req.body;
    try {
        const faculty = await db.getAvailableFacultyByTimeslots(timeSlots);
        res.status(200).json({ "faculty": faculty });
        return;
    } catch (error) {
        res.status(400).json({ "error": error.message });
        return;
    }
});


// EXPORTS
export default availabilityRoutes;