import { Test } from '@nestjs/testing';
import { TaskStatus } from './task-status.enum';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  username: 'Ariel',
  id: 'someId',
  password: 'somePassword',
  tasks: [],
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TasksRepository,
          useFactory: mockTasksRepository,
        },
      ],
    }).compile();
    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  it('calls TasksRepository.getTasks and returns the result', async () => {
    const mockTasks = [
      {
        title: 'Test title',
        description: 'Test desc',
        id: 'someId2',
        status: TaskStatus.OPEN,
      },
      {
        title: 'Test title',
        description: 'Test desc',
        id: 'someId2',
        status: TaskStatus.DONE,
      },
    ];

    tasksRepository.getTasks.mockResolvedValue(mockTasks);

    const result = await tasksService.getTasks(
      { status: TaskStatus.OPEN },
      mockUser,
    );
    expect(1).toEqual(1);
    expect(result[0].status).toEqual(TaskStatus.OPEN);
  });
});
