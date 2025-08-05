import React from 'react'

export function App() {
	const input1Ref = React.useRef<HTMLInputElement>(null)

	React.useEffect(() => {
		input1Ref.current?.focus()

		const keyboardEventHandler = (e: KeyboardEvent) => {
			if (e.ctrlKey && e.key === "a") {
				alert("ctrl+a")
			}
		}

		window.addEventListener("keydown", keyboardEventHandler)
		return () => window.removeEventListener("keydown", keyboardEventHandler)
	}, [])

	return (
		<>
			{/* Tempo */}
			<div style={{ marginBottom: 12 }}>
				<label htmlFor="tempo" style={{ marginRight: 12 }}>Tempo</label>
				<input ref={input1Ref} type="text" id="tempo" />
			</div>

			<div style={{ marginBottom: 12 }}>
				<input type="text" />
			</div>

			<div style={{ marginBottom: 12 }}>
				<input type="text" />
			</div>

			<div style={{ marginBottom: 12 }}>
				<input type="text" />
			</div>
		</>
	)
}

export default App
