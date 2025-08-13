export const mockUserService = {
  getList: jest.fn(),
  getDetail: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

export class MockUserService {
  getList = mockUserService.getList;
  getDetail = mockUserService.getDetail;
  create = mockUserService.create;
  update = mockUserService.update;
  delete = mockUserService.delete;
} 