
// import { useEffect } from 'ant-design-vue'
export default {
  name: 'lbp-email-template',
  props: {
    emails: {
      type: Array,
      default: []
    },
    selectIndex: {
      type: String,
      default: '0'
    },
    switchRecipient: {
      type: String,
      default: 'false'
    },
    switchAddressee: {
      type: String,
      default: 'false'
    },
    switchCopy: {
      type: String,
      default: 'false'
    },
    switchSubject: {
      type: String,
      default: 'false'
    },
    switchAdjuncts: {
      type: String,
      default: 'false'
    },
    switchContent: {
      type: String,
      default: 'false'
    }
  },
  methods: {
    addRedBorder(val) {
      console.log(val)
      let LValue = val
        .toLowerCase()
        .replace(/( |^)[a-z]/g, L => L.toUpperCase())
      console.log(LValue)
      // console.log(this['switch' + LValue])
      let active = document.getElementsByClassName('swiper-slide-active')
      console.log(active[0])
      if (active[0]) {
        let currentStyle = active[0].getElementsByClassName(val)
        console.log(currentStyle)
        if (this['switch' + LValue] === 'true') {
          if (val === 'content') {
            let content = this.emails[Number(this.selectIndex)].content
            const linkRegex = /https?:\/\/[^\s]+/g // 正则表达式用于匹配链接
            const links = content.match(linkRegex) // 通过正则匹配链接
            if (links) {
              links.forEach(link => {
                content = content.replace(
                  link,
                  `<a href=" " class="tooltip" style="color: blue;border: 2px solid red; position: relative;
                  display: inline-block;
                  cursor: pointer;">${link}<span class="tooltiptext" style="visibility: visible;
                  width: 150px;
                  background-color: #1890ff;
                  color: #fff;
                  text-align: center;
                  border-radius: 5px;
                  padding: 5px;
                  position: absolute;
                  z-index: 1;
                  bottom: 125%;
                  top: 45px;
                  opacity: 1;
                  height: 20px;
                  left: 50%;
                  transform: translateX(-50%);
                  opacity: 1;
                  transition: opacity 0.3s;">不要点击不明来源的链接</span></a >`
                ) // 修改链接样式
              })
              document.getElementById('content').innerHTML = content
            }
          } else {
            currentStyle[0].style.border = '2px solid red'
            const newSpan = document.createElement('span')
            newSpan.textContent = '不要点击不明来源的链接哈哈哈'
            newSpan.style.visibility = 'visible'
            newSpan.style.width = '150px'
            newSpan.style.backgroundColor = '#1890ff'
            newSpan.style.color = '#fff'
            newSpan.style.textAlign = 'center'
            newSpan.style.borderRadius = '5px'
            newSpan.style.padding = '5px'
            newSpan.style.zIndex = '1'
            newSpan.style.position = 'absolute'
            newSpan.style.bottom = '125%'
            newSpan.style.top = '20px'
            newSpan.style.opacity = '1'
            newSpan.style.height = '20px'
            newSpan.style.left = '80%'
            newSpan.style.transform = 'translateX(-50%)'
            newSpan.style.transition = 'opacity 0.3s'
            currentStyle[0].appendChild(newSpan)
          }
        }
      }
    }
  },
  render() {
    console.log(this.selectIndex, 'selectIndex')
    const { emails } = this
    const selectedEmail = emails[Number(this.selectIndex)]
    console.log(selectedEmail, 'selectedEmail')
    const {
      copy,
      adjuncts,
      addressee,
      recipient,
      subject,
      content
    } = selectedEmail
    // useEffect(() => {
    //   const linkRegex = /https?:\/\/[^\s]+/g // 正则表达式用于匹配链接
    //   const links = content.match(linkRegex) // 通过正则匹配链接

    //   if (links) {
    //     // links.forEach(link => {
    //     //   content = content.replace(link, `${link}`) // 修改链接样式
    //     // })
    //     // document.getElementById('content').innerHTML = content
    //   }
    // }, [])
    return (
      <div
        style={{
          fontFamily: 'Arial, sans-serif',
          padding: '10px',
          maxWidth: '600px',
          margin: '0 auto',
          textAlign: 'left'
        }}
      >
        <p
          onClick={() => this.addRedBorder('recipient')}
          class="recipient"
          style={{
            padding: '5px',
            position: 'relative'
          }}
        >
          发件人:{recipient}
        </p>
        <p
          onClick={() => this.addRedBorder('addressee')}
          class="addressee"
          style={{
            padding: '5px',
            position: 'relative'
          }}
        >
          收件人:{addressee}
        </p>
        <p
          onClick={() => this.addRedBorder('copy')}
          class="copy"
          style={{
            padding: '5px',
            position: 'relative'
          }}
        >
          抄送:{copy}
        </p>
        <p
          onClick={() => this.addRedBorder('subject')}
          class="subject"
          style={{
            padding: '5px',
            position: 'relative'
          }}
        >
          主题:{subject}
        </p>
        {adjuncts ? (
          <p
            onClick={() => this.addRedBorder('adjuncts')}
            class="adjuncts"
            style={{
              padding: '5px',
              position: 'relative'
            }}
          >
            附件: <a-icon style={{ color: 'green' }} type="file-excel" />
            {adjuncts}
          </p>
        ) : (
          <p>
            附件:
            {adjuncts}
          </p>
        )}
        <p
          style={{
            width: '100%',
            height: '1px',
            backgroundColor: '#ccc'
          }}
        ></p>
        <p
          onClick={() => this.addRedBorder('content')}
          id="content"
          class="content"
        >
          {content}
        </p>
      </div>
    )
  }
}
