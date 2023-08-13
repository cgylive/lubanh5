// https://github.com/luban-h5-components/plugin-common-props
import PropTypes from '@luban-h5/plugin-common-props'
import lbpEmailTemplate from './lbp-email-template.js'
const emailData = [
  {
    recipient: 'example1@example.com888', // 发件人
    addressee: '贾斯汀', // 收件人
    copy: '', // 抄送
    subject: '新冠疫情横扫中国——自救有良方!', // 主题
    adjuncts: '5q.xls(780KB)', // 附件
    content:
      'Just wanted to say hello. Hope you are doing well!Check out this link: https://www.example.com and also this one: http://anotherlink.com";' // 内容
  },
  {
    recipient: 'example2@example.com',
    addressee: '',
    copy: '',
    subject: 'Important Announcement',
    adjuncts: '',
    content: 'We have some important news to share with you.'
  }
]

export default {
  name: 'lbp-email',
  render() {
    return (
      <div>
        <lbpEmailTemplate
          emails={emailData}
          selectIndex={this.selectIndex}
          switchRecipient={this.switchRecipient}
          switchAddressee={this.switchAddressee}
          switchCopy={this.switchCopy}
          switchSubject={this.switchSubject}
          switchAdjuncts={this.switchAdjuncts}
          switchContent={this.switchContent}
        />
      </div>
    )
  },
  props: {
    selectIndex: {
      type: String,
      default: '0',
      editor: {
        type: 'a-select',
        label: '选择数据',
        props: {
          options: [
            { label: '数据1', value: '0' },
            { label: '数据2', value: '1' },
            { label: '数据3', value: '2' },
            { label: '数据4', value: '3' },
            { label: '数据5', value: '4' }
          ]
        }
      }
    },
    switchRecipient: {
      type: String,
      default: 'false',
      editor: {
        type: 'a-radio-group',
        label: '发件人是否圈出',
        props: {
          options: [
            { label: '是', value: 'true' },
            { label: '否', value: 'false' }
          ],
          name: 'mode'
        }
      }
    },
    switchAddressee: {
      type: String,
      default: 'false',
      editor: {
        type: 'a-radio-group',
        label: '收件人是否圈出',
        props: {
          options: [
            { label: '是', value: 'true' },
            { label: '否', value: 'false' }
          ],
          name: 'mode'
        }
      }
    },
    switchCopy: {
      type: String,
      default: 'false',
      editor: {
        type: 'a-radio-group',
        label: '抄送是否圈出',
        props: {
          options: [
            { label: '是', value: 'true' },
            { label: '否', value: 'false' }
          ],
          name: 'mode'
        }
      }
    },
    switchSubject: {
      type: String,
      default: 'false',
      editor: {
        type: 'a-radio-group',
        label: '主题是否圈出',
        props: {
          options: [
            { label: '是', value: 'true' },
            { label: '否', value: 'false' }
          ],
          name: 'mode'
        }
      }
    },
    switchAdjuncts: {
      type: String,
      default: 'false',
      editor: {
        type: 'a-radio-group',
        label: '附件是否圈出',
        props: {
          options: [
            { label: '是', value: 'true' },
            { label: '否', value: 'false' }
          ],
          name: 'mode'
        }
      }
    },
    switchContent: {
      type: String,
      default: 'false',
      editor: {
        type: 'a-radio-group',
        label: '内容是否圈出',
        props: {
          options: [
            { label: '是', value: 'true' },
            { label: '否', value: 'false' }
          ],
          name: 'mode'
        }
      }
    }
  }
}
