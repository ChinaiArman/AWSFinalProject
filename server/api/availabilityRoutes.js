import express from "express";
import FacultyAvailability from '../models/FacultyAvailability.js';

import { isSignedIn, isVerified, isStudent, isFaculty, isAdmin } from "../config/authConfig.js";


// CONSTANTS
const availabilityRoutes = express.Router();


// ROUTES
availabilityRoutes.post('/add', isSignedIn, isVerified, isFaculty, async (req, res) => {
    const db = req.db;
    const { facultyId, day, startTime, endTime, available } = req.body;

    try {
        const newAvailability = await db.addAvailability(facultyId, day, startTime, endTime, available);
        res.status(201).json({ message: 'Availability added successfully', newAvailability });
    } catch (error) {
        console.error('Error adding availability:', error);
        res.status(500).json({ error: error.message });
    }
});


availabilityRoutes.get('/:facultyId', isSignedIn, isVerified, isFaculty, async (req, res) => {
    const db = req.db;
    const { facultyId } = req.params;


    try {
        const availabilities = await db.getAvailabilityByFacultyId(facultyId);

        if (availabilities.length === 0) {
            return res.status(404).json({ message: 'No availability found for this faculty member' });
        }

        res.status(200).json(availabilities);
    } catch (error) {
        console.error('Error fetching availability:', error);
        res.status(500).json({ error: error.message });
    }
});


availabilityRoutes.delete('/delete/:id', isSignedIn, isVerified, isFaculty, async (req, res) => {
    const db = req.db;
    const { id } = req.params;


    try {
        const deletedRows = await db.deleteAvailabilityById(id);

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
availabilityRoutes.put('/:facultyId', isSignedIn, isVerified, isFaculty, async (req, res) => {
    const { facultyId } = req.params;
    const { availability } = req.body; // New availability
    const db = req.db;

    try {
        // Fetch existing availability
        const existingAvailability = await db.getAvailabilityByFacultyId(facultyId);

        // Create a map to avoid duplicates
        const availabilityMap = new Map();

        // Add existing availability to the map
        for (const entry of existingAvailability) {
            const key = `${entry.day}-${entry.start_time}-${entry.end_time}`;
            availabilityMap.set(key, entry);
        }

        // Add new availability to the map
        for (const entry of availability) {
            const key = `${entry.day}-${entry.start_time}-${entry.end_time}`;
            availabilityMap.set(key, { ...entry, faculty_id: facultyId });
        }

        // Convert map back to an array
        const updatedAvailability = Array.from(availabilityMap.values());

        // Update the database (delete old records and insert new ones)
        await db.updateFacultyAvailability(facultyId, updatedAvailability);

        res.status(200).json({ message: 'Availability updated successfully', updatedAvailability });
    } catch (error) {
        console.error('Error updating availability:', error);
        res.status(500).json({ error: error.message });
    }
});

availabilityRoutes.post('/getFacultyAvailableAtTimeSlots', isSignedIn, isVerified, isFaculty, async (req, res) => {
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