export const title_validation = {
  name: 'title',
  label: 'Task Title',
  type: 'text',
  id: 'title',
  validation: {
    required: {
      value: true,
      message: 'Title is required',
    },
    maxLength: {
      value: 50,
      message: '50 characters max',
    },
  },
};

export const desc_validation = {
  name: 'description',
  label: 'Description',
  type: 'text',
  multiline: true,
  id: 'description',
  validation: {
    required: {
      value: true,
      message: 'Description is required',
    },
    maxLength: {
      value: 200,
      message: '200 characters max',
    },
  },
};

export const date_validation = {
  name: 'dueDate',
  label: 'Due Date',
  type: 'date',
  id: 'due date',
  validation: {
    required: {
      value: true,
      message: 'Due Date is important',
    },
  },
};
