
import {observable, computed, action} from 'mobx';
import fetch from 'isomorphic-fetch';
import Config from '../../config';
import  GlobalStore from '../GlobalStore';
import $ from 'jquery';
export default class WebBillStore {
  globalStore = GlobalStore;
}
