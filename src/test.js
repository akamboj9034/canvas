var assert = require('chai').assert;
var app = require('./backend');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);

describe('View courses', function () {

    it('GET /course_list_faculty', function () {
        agent.get('/course_list_faculty').query({ created_by: 'asd' })
            .then(function (res) {
                expect(res.body[0].created_by).to.equal('asd');
            });
    });
})


describe('show quiz', function () {

    it('GET /quiz', function () {
        agent.get('/quiz').query({ created_by: 'asd' })
            .then(function (res) {
                expect(res.body[0].created_by).to.equal('asd');
            });
    });
})

describe('assignments', function () {

    it('GET /assignments_faculty', function () {
        agent.get('/show_assignment_faculty/:assignment_id').query({ assignment_id: '3' })
            .then(function (res) {
                expect(res.body[0].assignment_id).to.equal('3');
            });
    });
})
describe('assignments created', function () {

    it('GET /assignments_faculty', function () {
        agent.get('/assignments_faculty').query({ assignment_id: 'asd' })
            .then(function (res) {
                expect(res.body[0].assignment_id).to.equal('asd');
            });
    });
})

describe('upload file', function () {

    it('GET /upload_file', function () {
        agent.get('/upload_file').query({ assignment_id: 'asd' })
            .then(function (res) {
                expect(res.body[0].assignment_id).to.equal('asd');
            });
    });
})
