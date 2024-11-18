import express from "express";
import FacultyAvailability from '../models/FacultyAvailability.js';

import { isSignedIn, isVerified, isStudent, isFaculty, isAdmin } from "../config/authConfig.js";


// CONSTANTS
const availabilityRoutes = express.Router();


// ROUTES
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
availabilityRoutes.put('/updateAvailabilities', isSignedIn, isVerified, isFaculty, async (req, res) => {
    const db = req.db;
    const userId = req.session.userId;
    const facultyId = await db.getFacultyIdByUserId(userId);
    if (!facultyId) {
        return res.status(404).json({ message: 'Faculty member not found' });
    }
    const { availability } = req.body;
    // delete all availabilities for this faculty member
    try {
        await db.deleteAvailabilityByFacultyId(facultyId);
    } catch (error) {
        console.error('Error deleting availability:', error);
        res.status(500).json({ error: error.message });
    }
    // for each availability, insert into db
    try {
        availability.forEach(async (a) => {
            await db.createAvailability(facultyId, a.day, a.start_time, a.end_time);
        });
        res.status(200).json({ message: 'Availability updated successfully' });
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