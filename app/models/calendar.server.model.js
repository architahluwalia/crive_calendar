'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Calendar Schema
 */
var CalendarSchema = new Schema({
	date: {         
        type: Date,   
		required: 'date cannot be blank',
    },
    title: {
        type: String,
        default: '',
		required: 'title cannot be blank',
        trim: true
    }
});

mongoose.model('Calendar', CalendarSchema);