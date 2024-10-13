import { useState, useRef, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function PythonIDE() {
  const [code, setCode] = useState('# Write your Python code here\nprint("Hello, World!")')
  const [output, setOutput] = useState('')
  const editorRef = useRef(null)

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.textContent = code
    }
  }, [])

  const handleCodeChange = (event) => {
    const newCode = event.target.innerText
    setCode(newCode)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault()
      document.execCommand('insertText', false, '    ')
    }
  }

  const handleRunCode = () => {
    // In a real application, this would send the code to a backend for execution
    // Here, we'll just simulate some output
    setOutput(`Executing code...\n\n${code}\n\nOutput:\nHello, World!\n\nExecution completed.`)
  }

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#F7FAFC', padding: '16px' }}>
      {/* Left side - Code Editor with Syntax Highlighting */}
      <div style={{ width: '50%', paddingRight: '8px', position: 'relative' }}>
        <div style={{ width: '100%', height: '100%', overflow: 'auto', borderRadius: '8px', position: 'relative' }}>
          <SyntaxHighlighter
            language="python"
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: '16px',
              height: '100%',
              fontSize: '14px',
              lineHeight: '1.25rem',
            }}
            wrapLines={true}
            wrapLongLines={true}
          >
            {code}
          </SyntaxHighlighter>
          <div
            ref={editorRef}
            contentEditable
            onInput={handleCodeChange}
            onKeyDown={handleKeyDown}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              padding: '16px',
              fontFamily: 'monospace',
              fontSize: '14px',
              color: 'transparent',
              caretColor: 'white',
              outline: 'none',
              whiteSpace: 'pre-wrap',
              overflowWrap: 'break-word',
              lineHeight: '1.25rem',
              zIndex: 1,
              backgroundColor: 'transparent',
            }}
          />
        </div>
      </div>

      {/* Right side - Terminal and Run Button */}
      <div style={{ width: '50%', paddingLeft: '8px', display: 'flex', flexDirection: 'column' }}>
        <button
          style={{
            marginBottom: '8px',
            backgroundColor: '#38A169',
            hover: { backgroundColor: '#2F855A' },
            color: 'white',
            fontWeight: 'bold',
            padding: '8px 16px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={handleRunCode}
        >
          Run Code
        </button>
        <textarea
          style={{
            flexGrow: 1,
            width: '100%',
            padding: '16px',
            fontFamily: 'monospace',
            fontSize: '14px',
            backgroundColor: '#000000',
            color: '#38A169',
            borderRadius: '8px',
            resize: 'none',
            outline: 'none',
            boxSizing: 'border-box',
          }}
          value={output}
          readOnly
          placeholder="Output will appear here..."
        />
      </div>
    </div>
  )
}
