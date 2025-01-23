const logController = require('./logsController');
const LogModel = require('../models/logModel');
jest.mock('../models/logModel');

describe('LogController', () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('addLog', () => {
    const logData = {
      userId: '123',
      mood: 5,
      anxiety: 3,
      sleep: 7,
      activity: 4,
      social: 6,
      stress: 4
    };

    test('successfully adds a log', () => {
      mockRequest.body = logData;
      LogModel.createLog.mockImplementation((data, callback) => callback(null));

      logController.addLog(mockRequest, mockResponse);

      expect(LogModel.createLog).toHaveBeenCalledWith(logData, expect.any(Function));
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Log saved successfully',
        data: logData
      });
    });
  });

  describe('getLogs', () => {
    test('successfully retrieves logs for a user', () => {
      const userId = '123';
      const mockLogs = [
        { id: 1, userId: '123', mood: 5 },
        { id: 2, userId: '123', mood: 4 }
      ];

      mockRequest.params = { userId };
      LogModel.getLogsByUser.mockImplementation((id, callback) => callback(null, mockLogs));

      logController.getLogs(mockRequest, mockResponse);

      expect(LogModel.getLogsByUser).toHaveBeenCalledWith(userId, expect.any(Function));
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockLogs);
    });

    test('handles error when retrieving logs', () => {
      const userId = '123';
      const error = new Error('Database error');

      mockRequest.params = { userId };
      LogModel.getLogsByUser.mockImplementation((id, callback) => callback(error));

      logController.getLogs(mockRequest, mockResponse);

      expect(LogModel.getLogsByUser).toHaveBeenCalledWith(userId, expect.any(Function));
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: error.message });
    });
  });
});
