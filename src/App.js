import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3>V50 挑战赛: 水印去除</h3>
        <p>如果你能去掉这个页面的水印，我 V 你 50</p>

        <ul>
          <strong><p className="rule">规则如下：</p></strong>
          <li className="rule">你是第一个找到方法的人</li>
          <li className="rule">发送邮件或者微信给 zddhub，给出复现步骤</li>
          <li className="rule">我能按照步骤复现</li>
          <li className="rule">只使用 Chrome 浏览器</li>
          <li className="rule">不能禁用 JS</li>
          <li className="rule">不能使用颜色去水印，比如 Dark mode, 设置背景色和水印颜色一致等</li>
          <li className="rule">不能从网络层下手，比如 Mock JS，HTML 等手段</li>
          <li className="rule">不能自己写一个相同的页面，或者使用截图等手段</li>
          <li className="rule">最终解释权归 zddhub 所有</li>
        </ul>

          <copyright class="copyright typo-small">
            <span class="copyright">&copy;2023 ZDDHUB </span>
            <span class="bar"></span>
            <span> All rights reserved</span>
          </copyright>
      </header>
    </div>
  );
}

export default App;
