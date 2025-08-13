import { Request, Response } from 'express';
import { mockUserService } from '../../mocks/UserService.mock';

// Mock the UserService before importing the controller
jest.mock('@components/users/service', () => ({
  UserService: jest.fn().mockImplementation(() => ({
    getList: mockUserService.getList,
    getDetail: mockUserService.getDetail,
    create: mockUserService.create,
    update: mockUserService.update,
    delete: mockUserService.delete,
  })),
}));

import { UserController } from '@components/users/controller';

describe('UserController', () => {
  let userController: UserController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    userController = new UserController();
    
    mockRequest = {
      query: {},
      params: {},
      body: {},
    };
    
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    
    mockNext = jest.fn();
    
    // Reset all mocks
    jest.clearAllMocks();
  });

  describe('getList', () => {
    it('should return user list successfully', async () => {
      // Arrange
      const mockUserList = {
        data: [
          { id: 1, name: 'User 1', email: 'user1@test.com' },
          { id: 2, name: 'User 2', email: 'user2@test.com' },
        ],
        total: 2,
        page: 1,
        limit: 10
      };
      mockUserService.getList.mockResolvedValue(mockUserList);
      
      mockRequest.query = { page: '1', limit: '10' };

      // Act
      await userController.getList(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      expect(mockUserService.getList).toHaveBeenCalledWith(mockRequest.query);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith({
        code: 200,
        message: 'Get list data success',
        data: mockUserList,
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle errors and call next', async () => {
      // Arrange
      const mockError = new Error('Database error');
      mockUserService.getList.mockRejectedValue(mockError);

      // Act
      await userController.getList(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      expect(mockUserService.getList).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });

  describe('getDetail', () => {
    it('should return user detail successfully', async () => {
      // Arrange
      const mockUser = { id: 1, name: 'User 1', email: 'user1@test.com' };
      mockUserService.getDetail.mockResolvedValue(mockUser);
      
      mockRequest.params = { id: '1' };

      // Act
      await userController.getDetail(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      expect(mockUserService.getDetail).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith({
        code: 200,
        message: 'Get Detail data success',
        data: mockUser,
      });
    });

    it('should handle errors in getDetail', async () => {
      // Arrange
      const mockError = new Error('User not found');
      mockUserService.getDetail.mockRejectedValue(mockError);

      mockRequest.params = { id: '1' };

      // Act
      await userController.getDetail(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('create', () => {
    it('should create user successfully', async () => {
      // Arrange
      const newUser = { name: 'New User', email: 'new@test.com', username: 'newuser' };
      const createdUser = { id: 1, ...newUser };
      mockUserService.create.mockResolvedValue(createdUser);
      
      mockRequest.body = newUser;

      // Act
      await userController.create(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      expect(mockUserService.create).toHaveBeenCalledWith(newUser);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith({
        code: 200,
        message: 'Create data success',
        data: createdUser,
      });
    });

    it('should handle validation errors', async () => {
      // Arrange
      const mockError = new Error('Email or username is invalid or has been used!');
      mockUserService.create.mockRejectedValue(mockError);

      mockRequest.body = { email: 'existing@test.com', username: 'existing' };

      // Act
      await userController.create(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('update', () => {
    it('should update user successfully', async () => {
      // Arrange
      const updateData = { name: 'Updated User' };
      const updatedUser = { id: 1, name: 'Updated User', email: 'user@test.com' };
      mockUserService.update.mockResolvedValue(updatedUser);
      
      mockRequest.params = { id: '1' };
      mockRequest.body = updateData;

      // Act
      await userController.update(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      expect(mockUserService.update).toHaveBeenCalledWith(1, updateData);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith({
        code: 200,
        message: 'Update data success',
        data: updatedUser,
      });
    });

    it('should handle user not found in update', async () => {
      // Arrange
      const mockError = new Error('User not found!');
      mockUserService.update.mockRejectedValue(mockError);

      mockRequest.params = { id: '999' };
      mockRequest.body = { name: 'Updated' };

      // Act
      await userController.update(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('delete', () => {
    it('should delete user successfully', async () => {
      // Arrange
      const deleteResult = { affected: 1 };
      mockUserService.delete.mockResolvedValue(deleteResult);
      
      mockRequest.params = { id: '1' };

      // Act
      await userController.delete(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      expect(mockUserService.delete).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith({
        code: 200,
        message: 'Delete data success',
        data: deleteResult,
      });
    });

    it('should handle user not found in delete', async () => {
      // Arrange
      const mockError = new Error('User not found!');
      mockUserService.delete.mockRejectedValue(mockError);

      mockRequest.params = { id: '999' };

      // Act
      await userController.delete(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('constructor', () => {
    it('should initialize controller with UserService', () => {
      // Act
      const controller = new UserController();

      // Assert
      expect(controller).toBeInstanceOf(UserController);
      expect(controller.service).toBeDefined();
    });
  });
}); 