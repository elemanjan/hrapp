import {action, computed, observable} from 'mobx';
import {persist} from 'mobx-persist';
import {ADMIN, MANAGER} from '@config/credentials';
import CreateEmptyAlert from '@utils/createEmptyAlert';
import STRINGS from '@constants/strings';
import {pick} from 'react-native-document-picker';
import {STATUSES} from '@constants/constants';

export default class AppStore {
  @persist('object') @observable user = {};
  @persist('list') @observable users = [];
  @persist('object') @observable activeUser = {};
  @persist @observable lastUserId = 0;
  @persist @observable lastTaskId = 0;
  @persist('list') @observable tasks = [];
  @persist @observable userRole = 'unknown';
  @observable isLoading = false;
  @observable userId = null;
  @observable firstName = '';
  @observable login = '';
  @observable email = '';
  @observable password = '';

  @observable taskId = 0;
  @observable taskTitle = '';
  @observable taskDescription = '';
  @observable taskStatus = STATUSES.new;
  @observable taskFile = {
    name: '',
    uri: '',
  };

  @action.bound
  setUser(user) {
    this.user = user;
  }

  @action.bound
  setValue(name, value = '') {
    if (!name) {
      throw new Error('Name is required');
    }
    this[name] = value;
  }

  @action.bound
  onLogin = async (login, password) => {
    try {
      this.isLoading = true;
      await this.fakeLoader(1500);
      if (login === ADMIN.login && password === ADMIN.password) {
        this.userRole = 'admin';
        this.activeUser = ADMIN;
        return true;
      }

      if (login === MANAGER.login && password === MANAGER.password) {
        this.userRole = 'manager';
        this.activeUser = MANAGER;
        return true;
      }

      const user = this.users.find(item => item.login === login && item.password === password);
      if (user) {
        this.userRole = 'user';
        this.activeUser = user;
        return true;
      }

      this.userRole = 'unknown';
      return false;
    } catch (error) {
      console.error('err on login', error);
    } finally {
      this.isLoading = false;
    }
  };

  @action.bound
  createUser = async () => {
    try {
      this.isLoading = true;
      await this.fakeLoader(1000);
      const existingUser = this.users.find(user => user.login === this.login);
      if (existingUser) {
        CreateEmptyAlert(STRINGS.alertError.loginExist);
        return false;
      } else {
        this.lastUserId++;
        const user = {
          id: this.lastUserId,
          name: this.firstName,
          password: this.password,
          email: this.email,
          login: this.login,
          role: 'user',
        };
        this.users.push(user);
        return true;
      }
    } catch (error) {
      console.log('err on create user', error);
      return false;
    } finally {
      this.isLoading = false;
    }
  };

  @action.bound
  updateUser = async () => {
    try {
      this.isLoading = true;
      await this.fakeLoader(1200);
      const index = this.users.findIndex(user => user.login === this.login);
      this.users[index] = {
        name: this.firstName,
        password: this.password,
        email: this.email,
        login: this.login,
        role: 'user',
      };
      return true;
    } catch (error) {
      return false;
    } finally {
      this.isLoading = false;
    }
  };

  @action.bound
  deleteUser = async () => {
    try {
      this.isLoading = true;
      await this.fakeLoader(1200);
      const tempUsers = this.users;
      const index = this.users.findIndex(user => user.id === this.userId);
      tempUsers.splice(index, 1);
      this.users = tempUsers;
      return true;
    } catch (error) {
      return false;
    } finally {
      this.isLoading = false;
    }
  };

  @action.bound
  fakeLoader = async time => {
    try {
      await new Promise(resolve => setTimeout(resolve, time));
    } catch (error) {}
  };

  @action.bound
  createTask = async () => {
    try {
      this.isLoading = true;
      await this.fakeLoader(1200);
      this.lastTaskId++;
      const task = {
        id: this.lastTaskId,
        title: this.taskTitle,
        description: this.taskDescription,
        status: STATUSES.new,
        taskFile: this.taskFile,
        userId: this.userId,
        userName: this.firstName,
      };
      this.tasks.push(task);
    } catch (error) {
    } finally {
      this.isLoading = false;
      this.clearCreateTask();
    }
  };

  @action.bound
  updateTask = async () => {
    try {
      this.isLoading = true;
      await this.fakeLoader(1200);
      const index = this.tasks.findIndex(item => item.id === this.taskId);
      this.tasks[index] = {
        title: this.taskTitle,
        description: this.taskDescription,
        status: STATUSES.new,
        userId: this.userId,
        userName: this.firstName,
      };
    } catch (error) {
    } finally {
      this.isLoading = false;
      this.clearCreateTask();
    }
  };

  @action.bound
  deleteTask = async () => {
    try {
      this.isLoading = true;
      await this.fakeLoader(1200);
      const tempTasks = this.tasks;
      const index = this.tasks.findIndex(item => item.id === this.taskId);
      tempTasks.splice(index, 1);
      this.tasks = tempTasks;
    } catch (error) {
    } finally {
      this.isLoading = false;
      this.clearCreateTask();
    }
  };

  @action.bound
  updateTaskStatus = async status => {
    try {
      this.isLoading = true;
      await this.fakeLoader(1200);
      const tempTasks = this.tasks;
      const index = this.tasks.findIndex(item => item.id === this.taskId);
      tempTasks[index].status = status;
      this.tasks = tempTasks;
    } catch (error) {
    } finally {
      this.isLoading = false;
      this.clearCreateTask();
    }
  };

  @action.bound
  uploadFile = async time => {
    try {
      // Открываем диалог выбора файла с устройства пользователя
      const [result] = await pick({
        mode: 'open',
        requestLongTermAccess: true,
      });
      console.log('result', result);
      if (result) {
        this.taskFile.name = result?.name;
        this.taskFile.uri = result?.uri;
      }
    } catch (error) {}
  };

  @computed
  get filteredTasks() {
    // Получаем id пользователя из текущего пользователя
    const userId = this.activeUser.id;

    // Фильтруем задачи по id пользователя
    return this.tasks.filter(task => task.userId === userId);
  }

  @action.bound
  logout() {
    this.activeUser = {};
  }

  @action.bound
  clearCreateTask() {
    this.taskTitle = '';
    this.taskDescription = '';
    this.taskFile = {};
  }

  @action.bound
  clearCreateUser() {
    this.firstName = '';
    this.password = '';
    this.email = '';
    this.login = '';
  }
}
