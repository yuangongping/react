import React, { useState, useEffect } from 'react'
let firstrender = true
const Example = () => {
	// const [count, setCount] = useState(0)
	// const [userInfo, setUserInfo] = useState({
	// 	name: 'yzy',
	// 	age: 24,
	// 	sex: 'man'
	// })
	// const prevCountRef = useRef()
	// useEffect(() => {
	// 	prevCountRef.current = count
	// 	// console.log(prevCountRef.current)
	// })
	// return (
	// 	<div>
	// 		<p>You clicked {count} times, before: {prevCountRef.current}</p>
	// 		<p>你好，{userInfo.name}, 你今年{userInfo.age}岁， 你是一个{userInfo.sex}</p>
	// 		<button onClick={() => setCount(count + 1)}>
	//       Click me
	// 		</button>
	// 		<button onClick={() => { setUserInfo(Object.assign(userInfo, { name: 'tracy' })) }}>change userInfo</button>
	// 	</div>
	// )
	// let timer = null
	// const [visible, setVisible] = useState(false)
	// let leave = (source) => {
	// 	if (source === 'Time out') {
	// 		clearTimeout(timer)
	// 	}
	// 	setVisible(false)
	// 	console.log('注意这里是 leave方法里，timer的id:'+timer, '事件的来源:', source)
	// 	console.log('leave result:', timer)
	// }

	// let enter = () => {
	// 	setVisible(true)
	// 	timer = setTimeout(() => {
	// 		console.log('auto carried out', timer) //timer Number Id
	// 		leave('Time to')
	// 	}, 5000)
	// }

	// useEffect(()=>{
	// 	enter()
	// 	console.log('???')
	// 	console.log(timer)
	// 	return clearTimeout(timer)
	// }, [])
	// return (
	// 	<div style={{ display:`${visible?'':'none'}` }}>
	// 		<div >
	//     ……//首席填坑官∙苏南的专栏 交流：912594095、公众号：honeyBadger8
	// 		</div>
	// 		<p title="关闭" onClick={()=>leave('手动点击的关闭')}>dhajdhajshdajhsdjas</p>
	// 	</div>
	// )

	// const { friendList } = this.props
	// return (
	// 	<div>
	// 		{friendList.map((item, index) => (
	// 			<li
	// 				key={index}
	// 				style={{ color: useFriendStatus(item.id) ? 'green': 'black' }}>
	// 				{item.name}
	// 			</li>
	// 		))}
	// 	</div>
	// )

	const [size, setSize] = useState(16)
	const [width, setWidth] = useState(null)
	const onWindowResize = () => {
		setWidth(document.documentElement.offsetWidth)
	}
	if (!firstrender) {
		useEffect(() => {
			setSize(document.documentElement.offsetWidth / 20)
		}, [width])
	} else {
		useEffect(() => {
			window.addEventListener('resize', onWindowResize)
			firstrender = false
		}, [])
	}
	return (
		<div style={{ fontSize: `${size}px` }}>
	    根据窗口的宽度调整字体的大小, 但首次无论什么宽度都为默认字体大小
		</div>
	)
}
export default Example

// import React from 'react'

// class User extends React.Component {
//   state = {
//   	userInfo: {
//   		name: 'yzy',
//   		age: 24,
//   		sex: 'man'
//   	}
//   }
//   setUserInfo = () => {
//   	this.setState({
//   		userInfo: Object.assign(this.state.userInfo, { name : 'bill' })
//   	})
//   }
//   render () {
//   	return (
//   		<div>
//   			<p>你好，{this.state.userInfo.name}, 你今年{this.state.userInfo.age}岁， 你是一个{this.state.userInfo.sex}</p>
//   			<button onClick={this.setUserInfo}>change userInfo</button>
//   		</div>
//   	)
//   }
// }

// export default User
