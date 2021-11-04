
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Video to Lottie

Local movie.mp4 to lottie.json converter. Adobe / After Effects optional!

Choose your web-happy video file here:`
)});
  main.variable(observer("viewof videoFile")).define("viewof videoFile", ["html"], function(html){return(
html`<input type="file" accept=".mp4,.mov,.webm" />`
)});
  main.variable(observer("videoFile")).define("videoFile", ["Generators", "viewof videoFile"], (G, _) => G.input(_));
  main.variable(observer("viewof inputFPS")).define("viewof inputFPS", ["html"], function(html){return(
html`<input type=number value=30 />`
)});
  main.variable(observer("inputFPS")).define("inputFPS", ["Generators", "viewof inputFPS"], (G, _) => G.input(_));
  main.variable(observer("maxFrameCountGuess")).define("maxFrameCountGuess", ["duration","inputFPS"], function(duration,inputFPS){return(
Math.round(duration * inputFPS)
)});
  main.variable(observer("outputWidth")).define("outputWidth", ["options","videoWidth"], function(options,videoWidth){return(
Math.floor(options.outputScale * videoWidth)
)});
  main.variable(observer("outputHeight")).define("outputHeight", ["options","videoHeight"], function(options,videoHeight){return(
Math.floor(options.outputScale * videoHeight)
)});
  main.variable(observer("viewof options")).define("viewof options", ["formWithSumbit","html","maxFrameCountGuess","duration"], function(formWithSumbit,html,maxFrameCountGuess,duration)
{
  const form = formWithSumbit(html`
  <form style="display: grid; grid-template-columns: 7em 14.5em; grid-gap: 0.5em;">
    <label for="outputScale">Scale output:</label>
    <input name="outputScale" type="number" value="1" min="0" max="1" step="0.01" />
    <label for="numFrames">Frame count:</label>
    <input name="numFrames" value="12" type="number" min="2" max="${maxFrameCountGuess}" />
    <label for="quality">JPG quality:</label>
    <input name="quality" value="0.8" type="number" min="0" max="1" step="0.01" />
    <label for="clipStart">Clip start:</label>
    <input name="clipStart" value="0" type="number" min="0" max="${duration}" step="0.000001" />
    <label for="clipEnd">Clip end:</label>
    <input name="clipEnd" value="${duration}" type="number" min="0" max="${duration}" step="0.000001" />
    <input type="submit" value="Encode!" style="grid-column: 1 / span 2; padding: 0.5em;" />
  </form>
`);
  // form.querySelector('[type="submit"]').disabled = busy || !videoFile;
  return form;
}
);
  main.variable(observer("options")).define("options", ["Generators", "viewof options"], (G, _) => G.input(_));
  main.variable(observer()).define(["options"], function(options){return(
options
)});
  main.variable(observer()).define(["html","progress","width"], function(html,progress,width){return(
html`<div style="color: white; background-color: blue; padding: 0.25em 0.5em; width: ${progress *
  width}px" >${Math.floor(progress * 100)}%</div>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`After frames are captured, lottie.json download link will show here:`
)});
  main.variable(observer()).define(["outputLink"], function(outputLink){return(
outputLink.cloneNode(true)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Lottie preview of encoded frames`
)});
  main.variable(observer("viewof previewScrub")).define("viewof previewScrub", ["html","options"], function(html,options){return(
html`<input type=range value=0 min=0 max=${options.numFrames -
  1} />`
)});
  main.variable(observer("previewScrub")).define("previewScrub", ["Generators", "viewof previewScrub"], (G, _) => G.input(_));
  main.variable(observer("previewImage")).define("previewImage", ["html","previewScrub","frames"], function(html,previewScrub,frames){return(
html`<div>${previewScrub}</div><img src="${frames[previewScrub].data}">`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## \`video\` element: frames are captured from here`
)});
  main.variable(observer("videoEl")).define("videoEl", ["html","videoFile","mutable videoWidth","mutable videoHeight","mutable duration","mutable currentTime"], function(html,videoFile,$0,$1,$2,$3)
{
  const videoEl = html`<video src="${URL.createObjectURL(
    videoFile
  )}" controls style="max-width: 100%;" />`;

  videoEl.addEventListener('loadedmetadata', function(event) {
    $0.value = videoEl.videoWidth;
    $1.value = videoEl.videoHeight;
  });

  videoEl.addEventListener('durationchange', function(event) {
    $2.value = videoEl.duration;
  });

  function setCurrentTime() {
    $3.value = videoEl.currentTime;
  }
  videoEl.addEventListener('seeked', setCurrentTime);
  videoEl.addEventListener('timeupdate', setCurrentTime);

  return videoEl;
}
);
  main.define("initial videoWidth", function(){return(
0
)});
  main.variable(observer("mutable videoWidth")).define("mutable videoWidth", ["Mutable", "initial videoWidth"], (M, _) => new M(_));
  main.variable(observer("videoWidth")).define("videoWidth", ["mutable videoWidth"], _ => _.generator);
  main.define("initial videoHeight", function(){return(
0
)});
  main.variable(observer("mutable videoHeight")).define("mutable videoHeight", ["Mutable", "initial videoHeight"], (M, _) => new M(_));
  main.variable(observer("videoHeight")).define("videoHeight", ["mutable videoHeight"], _ => _.generator);
  main.define("initial duration", function(){return(
0
)});
  main.variable(observer("mutable duration")).define("mutable duration", ["Mutable", "initial duration"], (M, _) => new M(_));
  main.variable(observer("duration")).define("duration", ["mutable duration"], _ => _.generator);
  main.define("initial currentTime", function(){return(
0
)});
  main.variable(observer("mutable currentTime")).define("mutable currentTime", ["Mutable", "initial currentTime"], (M, _) => new M(_));
  main.variable(observer("currentTime")).define("currentTime", ["mutable currentTime"], _ => _.generator);
  main.define("initial busy", function(){return(
false
)});
  main.variable(observer("mutable busy")).define("mutable busy", ["Mutable", "initial busy"], (M, _) => new M(_));
  main.variable(observer("busy")).define("busy", ["mutable busy"], _ => _.generator);
  main.define("initial progress", function(){return(
0
)});
  main.variable(observer("mutable progress")).define("mutable progress", ["Mutable", "initial progress"], (M, _) => new M(_));
  main.variable(observer("progress")).define("progress", ["mutable progress"], _ => _.generator);
  main.variable(observer("outputFrameRate")).define("outputFrameRate", ["options","duration"], function(options,duration){return(
Math.max(1, Math.floor(options.numFrames / duration))
)});
  main.variable(observer("seekTo")).define("seekTo", function(){return(
async function seekTo(videoEl, time) {
  return new Promise((resolve, reject) => {
    const handleSeeked = function() {
      videoEl.removeEventListener('seeked', handleSeeked);
      resolve(videoEl.currentTime);
    };
    videoEl.addEventListener('seeked', handleSeeked);
    videoEl.currentTime = time;
  });
}
)});
  main.variable(observer("extractFrames")).define("extractFrames", ["seekTo","mutable progress"], function(seekTo,$0){return(
async function extractFrames({
  videoEl,
  clipStart,
  clipEnd,
  numFrames,
  quality = 0.8,
  outputScale = 1
}) {
  // if (busy) {
  //   throw new Error('Already encoding, wait a moment...');
  // }
  // mutable busy = true;
  videoEl.pause();

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const outputWidth = outputScale * videoEl.videoWidth;
  const outputHeight = outputScale * videoEl.videoHeight;
  canvas.width = outputWidth;
  canvas.height = outputHeight;

  const frames = [];

  for (let i = 0; i < numFrames; i++) {
    const duration = clipEnd - clipStart;
    if (duration <= 0) {
      throw new Error('clipEnd is before clipStart');
    }
    const time = i * (duration / (Math.max(2, numFrames) - 1)) + clipStart;
    // In threory, waits until seeked time is in view
    const seekedTime = await seekTo(videoEl, time);
    context.drawImage(videoEl, 0, 0, outputWidth, outputHeight);
    frames.push({
      time,
      seekedTime,
      data: canvas.toDataURL('image/jpeg', quality)
    });
    $0.value = (i + 1) / numFrames;
  }

  // mutable busy = false;

  return frames;
}
)});
  main.variable(observer("frames")).define("frames", ["extractFrames","videoEl","options"], function(extractFrames,videoEl,options){return(
extractFrames({
  videoEl,
  ...options
})
)});
  main.variable(observer("preview")).define("preview", ["frames","html"], function(frames,html)
{
  const previewImages = frames.map(
    ({ data }) => html`<img src="${data}" style="max-width: 128px">`
  );
  return html`<div>${previewImages}</div>`;
}
);
  main.variable(observer("lottieJson")).define("lottieJson", ["frames","outputWidth","outputHeight","outputFrameRate","options"], function(frames,outputWidth,outputHeight,outputFrameRate,options){return(
frames.reduce(
  function(lottie, frame, index) {
    const id = "fr_" + index;
    const w = outputWidth;
    const w2 = Math.floor(w / 2);
    const h = outputHeight;
    const h2 = Math.floor(h / 2);

    lottie.assets.push({
      id,
      w,
      h,
      u: "",
      p: frame.data,
      e: 1
    });

    lottie.layers.push({
      ddd: 0,
      ind: index + 1,
      ty: 2,
      nm: id + ".jpg",
      cl: "jpg",
      refId: id,
      sr: 1,
      ks: {
        o: { a: 0, k: 100, ix: 11 },
        r: { a: 0, k: 0, ix: 10 },
        p: { a: 0, k: [w2, h2, 0], ix: 2 },
        a: { a: 0, k: [w2, h2, 0], ix: 1 },
        s: { a: 0, k: [100, 100, 100], ix: 6 }
      },
      ao: 0,
      ip: index,
      op: index + 1,
      st: index,
      bm: 0
    });

    return lottie;
  },
  {
    v: "5.5.2",
    fr: outputFrameRate,
    ip: 0,
    op: options.numFrames,
    w: outputWidth,
    h: outputHeight,
    nm: "@forresto/movie-to-lottie",
    ddd: 0,
    assets: [],
    layers: [],
    markers: []
  }
)
)});
  main.variable(observer("outputLink")).define("outputLink", ["lottieJson","videoFile","html"], function(lottieJson,videoFile,html)
{
  const jsonString = JSON.stringify(lottieJson);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const outputFilename = videoFile.name + ".lottie.json";
  return html`<a href="${url}" download="${outputFilename}">${outputFilename} (${Math.round(
    blob.size / 1024
  )}kb)</a>`;
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`## Libs`
)});
  const child1 = runtime.module(// https://observablehq.com/@forresto/form-input-with-submit@206


     function define(runtime, observer) {
      const main = runtime.module();
      main.variable(observer()).define(["md"], function(md){return(
    md`# Form Input With Submit
    
    This notebook defines a \`formWithSubmit\` function which makes it easier to use complex forms together with [Observable views](/@mbostock/introduction-to-views).
    
    This fork changes [@mbostock/form-input](https://observablehq.com/@mbostock/form-input)'s version to **not** output the values until the form is submitted.
    
    To use it in your notebook:
    
    \`\`\`js
    import {formWithSumbit} from "@forresto/form-input-with-submit"
    \`\`\`
    
    Pass the *formWithSumbit* function a form element, and you’re off to the races! ??`
    )});
      main.variable(observer("viewof object")).define("viewof object", ["formWithSubmit","html"], function(formWithSubmit,html){return(
    formWithSubmit(html`<form>
      <div><label><input name="message" type="text" value="Hello, form!"> <i>message</i></label></div>
      <div><label><input name="number" type="number" value="1"> <i>number</i></label></div>
      <div><label><input name="hue" type="range" min=0 max=360> <i>hue</i></label></div>
      <div>
        <label><input name="size" type="radio" value="12"> <i>small</i></label>
        <label><input name="size" type="radio" value="24" checked> <i>medium</i></label>
        <label><input name="size" type="radio" value="48"> <i>large</i></label>
      </div>
      <input type="submit" value="Submit">
    </form>`)
    )});
      main.variable(observer("object")).define("object", ["Generators", "viewof object"], (G, _) => G.input(_));
      main.variable(observer()).define(["object"], function(object){return(
    object
    )});
      main.variable(observer()).define(["md"], function(md){return(
    md`Now you have a reactive reference to resulting object!
    
    Until the form is submitted, \`object\` will be unresolved, and this won't draw:`
    )});
      main.variable(observer()).define(["html","svg","object"], function(html,svg,object){return(
    html`<svg
      width="640"
      height="64"
      viewBox="0 0 640 64"
      style="width:100%;max-width:640px;height:auto;display:block;background:#333;"
    >
      ${Object.assign(
        svg`<text
        x="50%"
        y="50%"
        text-anchor="middle" 
        dy="0.35em"
        fill="hsl(${object.hue},100%,50%)"
        font-size="${object.size}"
      >`,
        {
          textContent: object.message + " " + object.number
        }
      )}
    </svg>`
    )});
      main.variable(observer()).define(["md"], function(md){return(
    md`---
    
    ## Implementation`
    )});
      main.variable(observer("formWithSubmit")).define("formWithSumbit", ["html","formValue"], function(html,formValue){return(
    function formWithSubmit(form) {
      const container = html`<div>${form}`;
      form.addEventListener("submit", event => {
        event.preventDefault();
        container.value = formValue(form);
        container.dispatchEvent(new CustomEvent("input"));
      });
      form.addEventListener("input", event => {
        event.preventDefault();
        // Need this, because otherwise the viewof Generator catches bubbling input events
        event.stopPropagation();
      });
      return container;
    }
    )});
      const child1 = runtime.module( function define(runtime, observer) {
        const main = runtime.module();
        main.variable(observer()).define(["md"], function(md){return(
      md`# Form Input
      
      This notebook defines a *form* function which makes it easier to use complex forms together with [Observable views](/@mbostock/introduction-to-views). To use it in your notebook:
      
      \`\`\`js
      import {form} from "@mbostock/form-input"
      \`\`\`
      
      Pass the *form* function a form element, and you’re off to the races! ??`
      )});
        main.variable(observer("viewof object")).define("viewof object", ["form","html"], function(form,html){return(
      form(html`<form>
        <div><label><input name="message" type="text" value="Hello, form!"> <i>message</i></label></div>
        <div><label><input name="hue" type="range" min=0 max=360> <i>hue</i></label></div>
        <div>
          <label><input name="size" type="radio" value="12"> <i>small</i></label>
          <label><input name="size" type="radio" value="24" checked> <i>medium</i></label>
          <label><input name="size" type="radio" value="48"> <i>large</i></label>
        </div>
        <div>
          <label>
            <select name="emojis" multiple size="3">
              <option value="??">??</option>
              <option value="??">??</option>
              <option value="??">??</option>
            </select>
          <i>emojis</i></label>
        </div>
      </form>`)
      )});
        main.variable(observer("object")).define("object", ["Generators", "viewof object"], (G, _) => G.input(_));
        main.variable(observer()).define(["object"], function(object){return(
      object
      )});
        main.variable(observer()).define(["md"], function(md){return(
      md`Now you have a reactive reference to resulting object!`
      )});
        main.variable(observer()).define(["html","svg","object"], function(html,svg,object){return(
      html`<svg
        width="640"
        height="64"
        viewBox="0 0 640 64"
        style="width:100%;max-width:640px;height:auto;display:block;background:#333;"
      >
        ${Object.assign(
          svg`<text
          x="50%"
          y="50%"
          text-anchor="middle" 
          dy="0.35em"
          fill="hsl(${object.hue},100%,50%)"
          font-size="${object.size}"
        >`,
          {
            textContent: `${object.message} ${object.emojis.join(" ")}`
          }
        )}
      </svg>`
      )});
        main.variable(observer()).define(["md"], function(md){return(
      md`---
      
      ## Implementation`
      )});
        main.variable(observer("form")).define("form", ["html","formValue"], function(html,formValue){return(
      function form(form) {
        const container = html`<div>${form}`;
        form.addEventListener("submit", event => event.preventDefault());
        form.addEventListener("change", () => container.dispatchEvent(new CustomEvent("input")));
        form.addEventListener("input", () => container.value = formValue(form));
        container.value = formValue(form);
        return container
      }
      )});
        main.variable(observer("formValue")).define("formValue", function(){return(
      function formValue(form) {
        const object = {};
        for (const input of form.elements) {
          if (input.disabled || !input.hasAttribute("name")) continue;
          let value = input.value;
          switch (input.type) {
            case "range":
            case "number": {
              value = input.valueAsNumber;
              break;
            }
            case "date": {
              value = input.valueAsDate;
              break;
            }
            case "radio": {
              if (!input.checked) continue;
              break;
            }
            case "checkbox": {
              if (input.checked) value = true;
              else if (input.name in object) continue;
              else value = false;
              break;
            }
            case "file": {
              value = input.multiple ? input.files : input.files[0];
              break;
            }
            case "select-multiple": {
              value = Array.from(input.selectedOptions, option => option.value);
              break;
            }
          }
          object[input.name] = value;
        }
        return object;
      }
      )});
        return main;
      }
      );
    
    
    
      
      main.import("formValue", child1);
      return main;
    }
    
    
    
    
    
    );
  main.import("formWithSumbit", child1);
  return main;
}
