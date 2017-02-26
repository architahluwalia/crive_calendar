'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Calendar = mongoose.model('Calendar'),
    _ = require('lodash');

/**
 * Create a Calendar
 */
exports.create = function(req, res) {
	var calendar = new Calendar(req.body);
	calendar.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.status(201).json(calendar);
		}
	});
};
/**
 * Show the current Calendar
 */
exports.read = function(req, res) {

};

/**
 * Update a Calendar
 */
exports.update = function(req, res) {

};

/**
 * Delete an Calendar
 */
exports.delete = function(req, res) {
	var calendar = req.calendar;

	calendar.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(calendar);
		}
	});
};

/**
 * List of Categories
 */
exports.list = function(req, res) {
	Calendar.find().exec(function(err, calendars) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(calendars);
		}
	});
};


exports.calendarByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Calendar EVent is invalid'
		});
	}

	Calendar.findById(id).exec(function(err, calendar) {
		if (err) return next(err);
		if (!calendar) {
			return res.status(404).send({
  				message: 'Calendar EVent not found'
  			});
		}
		req.calendar = calendar;
		next();
	});
};