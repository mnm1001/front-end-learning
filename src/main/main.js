import "./main.css";

(function () {
  const requireAllIndexJs = require.context(
    "@/demos/",
    true,
    /index.js$|.*?\.html/
  );
  const demos = requireAllIndexJs.keys().map((item) => {
    var tag = `
        <li>
          <a href="${item.replace("/index.js", "")}">${item}</a>
        </li>
      `;
    return tag;
  });

  document.querySelector("#content").innerHTML = demos.join("");
})();
