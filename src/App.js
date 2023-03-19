import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3>V50 挑战赛: 水印去除</h3>
        <p>如果你能去掉这个页面的水印，我 V 你 50</p>

        <ul>
          <strong><p className="rule">规则如下：</p></strong>
          <li className="rule">你是第一个发现这个方法的人</li>
          <li className="rule">发送邮件或者微信给 zddhub，给出复现步骤</li>
          <li className="rule">我能按照步骤复现</li>
          <li className="rule">只使用 Chrome 浏览器</li>
          <li className="rule">不能禁用 JS</li>
          <li className="rule">最终解释权归 zddhub 所有</li>
        </ul>
      </header>
    </div>
  );
}

export default App;
