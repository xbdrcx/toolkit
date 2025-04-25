import Editor from "@monaco-editor/react";

export default function CodeEditor() {
  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <Editor
        height="90vh"
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue="// write some code"
      />
    </div>
  );
}
