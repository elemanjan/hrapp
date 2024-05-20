import {action, computed, observable} from 'mobx';
import {persist} from 'mobx-persist';
import {ADMIN, MANAGER} from '@config/credentials';
import CreateEmptyAlert from '@utils/createEmptyAlert';
import STRINGS from '@constants/strings';
import * as DocumentPicker from 'react-native-document-picker';
import {pick} from 'react-native-document-picker';
import {STATUSES} from '@constants/constants';
import {getUserRole} from '@utils/getUserRole';
import FileViewer from 'react-native-file-viewer';
import {Alert} from 'react-native';

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
  @observable userTaskDescription = '';
  @observable taskStatus = STATUSES.new;
  @observable taskFile = {
    name: '',
    uri: '',
  };
  @observable userTaskFile = {
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
        userTaskFile: {
          name: '',
          uri: '',
        },
        userTaskDescription: '',
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
        id: this.taskId,
        title: this.taskTitle,
        description: this.taskDescription,
        status: STATUSES.new,
        userId: this.userId,
        userName: this.firstName,
        taskFile: this.taskFile,
        userTaskFile: this.userTaskFile,
        userTaskDescription: '',
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
      tempTasks[index].userTaskFile = this.userTaskFile;
      tempTasks[index].userTaskDescription = this.userTaskDescription;
      this.tasks = tempTasks;
    } catch (error) {
    } finally {
      this.isLoading = false;
      this.clearCreateTask();
    }
  };

  @action.bound
  uploadFile = async () => {
    try {
      const isUser = getUserRole() === 'user';
      const [result] = await pick({
        type: [DocumentPicker.types.allFiles],
      });
      if (result) {
        console.log('this user task', this.userTaskFile);
        if (isUser) {
          this.userTaskFile.name = result?.name;
          this.userTaskFile.uri = result?.uri;
        } else {
          this.taskFile.name = result?.name;
          this.taskFile.uri = result?.uri;
        }
      }
    } catch (error) {
      console.error('error upload file', error);
    }
  };

  @action.bound
  openFile = async () => {
    try {
      const isUser = getUserRole() === 'user';
      await FileViewer.open(isUser ? this.userTaskFile.uri : this.taskFile.uri);
    } catch (error) {
      // console.error('Ошибка при обмене файлом:', error);
      Alert.alert('Ошибка', 'Ошибка при открытии файла');
    }
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
