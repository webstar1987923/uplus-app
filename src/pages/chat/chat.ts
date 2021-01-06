import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Events, Content } from 'ionic-angular';
import { /*ChatService,*/ ChatMessage, UserInfo } from "../../providers/chat-service";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {


  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: ElementRef;
  msgList: ChatMessage[] = [];
  user: UserInfo;
  toUser: UserInfo;
  editorMsg = '';
  showEmojiPicker = false;
  serverUrl = "http://unak.vip/uplus/Api/mobile";

  runtime: any = "";

  constructor(navParams: NavParams,
              public navCtrl: NavController,
              // private chatService: ChatService,
              public http: Http,
              private events: Events,) {
    // Get the navParams toUserId parameter
    this.toUser = {
      id: navParams.get('cid'),
      name: navParams.get('cname'),
      avatar: navParams.get('cphoto')
    };
    // Get mock user information
    var userInfo = localStorage.getItem('infoData');
    if(userInfo) {
      var userData = JSON.parse(userInfo);
      let uPhoto = (userData.photo) ? this.serverUrl + "/profile_imgs/" + userData.photo: "assets/imgs/other/default.png";

      this.user = {
        id: userData.uid,
        name: userData.realname,
        avatar: uPhoto
      };
    }
  }

  ionViewWillLeave() {
    // unsubscribe
    clearInterval(this.runtime);
    this.events.unsubscribe('chat:received');
  }

  ionViewDidEnter() {
    //get message list
    this.getMsg();

    // Subscribe to received  new message events
    this.events.subscribe('chat:received', msg => {
      this.pushNewMsg(msg);
    });

    var __this = this;
    this.runtime = setInterval(function() {
      __this.getNewMessageList();
    }, 1000);
  }

  onFocus() {
    this.showEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
  }

  switchEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    if (!this.showEmojiPicker) {
      this.focus();
    } else {
      this.setTextareaScroll();
    }
    this.content.resize();
    this.scrollToBottom();
  }

  getMsg() {
    let list = [];
    list = this.getMsgList();
    if(list.length > 0) {
      for(let i = 0; i < list.length; i++) {
        this.msgList.push(list[i]);
      }
      this.scrollToBottom();
    } else {
      let postData = {
        userId: this.user.id,
        toUserId: this.toUser.id
      };
      this.http.post(this.serverUrl + "/chat_get_first.php", JSON.stringify(postData))
      .map(res => res.json())
      .subscribe(data => {
        let tmp = data.list;
        for(let n = 0; n < tmp.length; n++) {
          const mockMsg: ChatMessage = {
            messageId: tmp[n].time,
            userId: tmp[n].sender,
            userName: (tmp[n].sender == this.user.id) ? this.user.name : this.toUser.name,
            userAvatar: (tmp[n].sender == this.user.id) ? this.user.avatar : this.toUser.avatar,
            toUserId: tmp[n].receiver,
            time: tmp[n].time,
            message: tmp[n].message,
            status: 'success'
          };
          this.msgList.push(mockMsg);
        }
        this.scrollToBottom();
      }, err => {

      });
    }
  }

  /**
   * @name sendMsg
   */
  sendMsg() {
    if (!this.editorMsg.trim()) return;

    // Mock message
    const id = Date.now().toString();
    let newMsg: ChatMessage = {
      messageId: Date.now().toString(),
      userId: this.user.id,
      userName: this.user.name,
      userAvatar: this.user.avatar,
      toUserId: this.toUser.id,
      time: Date.now(),
      message: this.editorMsg,
      status: 'success'
    };

    this.pushNewMsg(newMsg);
    this.editorMsg = '';

    if (!this.showEmojiPicker) {
      this.focus();
    }
    this.http.post(this.serverUrl + "/chat_send.php", JSON.stringify(newMsg))
    .map(res => res.json())
    .subscribe(data => {}, err => {});

    // this.chatService.sendMsg(newMsg)
    // .then(() => {
    //   let index = this.getMsgIndexById(id);
    //   if (index !== -1) {
    //     this.msgList[index].status = 'success';
    //   }
    // })
  }

  /**
   * @name pushNewMsg
   * @param msg
   */
  pushNewMsg(msg: ChatMessage) {
    const userId = this.user.id,
      toUserId = this.toUser.id;
    // Verify user relationships
    if (msg.userId === userId && msg.toUserId === toUserId) {
      this.msgList.push(msg);
    } else if (msg.toUserId === userId && msg.userId === toUserId) {
      this.msgList.push(msg);
    }

    localStorage.setItem(this.toUser.id, JSON.stringify(this.msgList));

    this.scrollToBottom();
  }

  getMsgIndexById(id: string) {
    return this.msgList.findIndex(e => e.messageId === id)
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }

  private focus() {
    if (this.messageInput && this.messageInput.nativeElement) {
      this.messageInput.nativeElement.focus();
    }
  }

  private setTextareaScroll() {
    const textarea =this.messageInput.nativeElement;
    textarea.scrollTop = textarea.scrollHeight;
  }

  getMsgList(){
    const data = localStorage.getItem(this.toUser.id);
    let msgList;
    if(data == "" || data == null || data == undefined) {
      msgList = [];
    } else {
      msgList = JSON.parse(data);
    }
    return msgList;
  }

  getNewMessageList() {
    let lastTime = localStorage.getItem(this.toUser.id + "_last");
    let postData = {
      'userId' : this.user.id,
      'toUserId' : this.toUser.id,
      'time' : lastTime,
    };

    this.http.post(this.serverUrl + "/chat_get.php", JSON.stringify(postData))
    .map(res => res.json())
    .subscribe(data => {
      let tmp = data.list;
      for(let n = 0; n < tmp.length; n++) {
        const mockMsg: ChatMessage = {
          messageId: tmp[n].time,
          userId: this.toUser.id,
          userName: this.toUser.name,
          userAvatar: this.toUser.avatar,
          toUserId: this.user.id,
          time: tmp[n].time,
          message: tmp[n].message,
          status: 'success'
        };
        this.events.publish('chat:received', mockMsg, Date.now());
      }

      if(tmp.length > 0) {
        localStorage.setItem(this.toUser.id + "_last", tmp[tmp.length - 1].time);
      }

    }, err => {

    });
  }

}
