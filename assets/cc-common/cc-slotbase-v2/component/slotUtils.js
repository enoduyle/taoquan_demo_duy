function getWorldScale(node){
    let currentNode = node;
    let scale = currentNode.scale;
    while (currentNode.parent) {
        scale *= currentNode.parent.scale;
        currentNode = currentNode.parent;
    }
    return scale;
}

const _factoryCache = {};

export function factorial(n) {
    if (_factoryCache[n] !== void 0) return _factoryCache[n];
    _factoryCache[n] = n < 2 ? 1 : n * factorial(n - 1);
    return _factoryCache[n];
}

export function combination(n, k) {
    return factorial(n) / factorial(k) / factorial(n - k);
}

export function bezier(pos, t) {
    const n = pos.length - 1, t1 = 1 - t;
    let _val = 0;
    for (let i = 0; i <= n; i++) {
        // Pi * Combine(n,i) * t^i * (1-t)^(n-i)
        _val += pos[i] * combination(n, i) * Math.pow(t, i) * Math.pow(t1, (n - i));
    }
    return _val;
}

export function bezierTo(node, duration, positions, option = {}) {
    const _target = { t: 0 };
    let bezierX, bezierY;
    const _options = Object.assign({}, option);
    _options.progress = (start, end, current, ratio) => {
        const { t } = _target;
        node.x = bezier(bezierX, t);
        node.y = bezier(bezierY, t);
        return start + (end - start) * ratio;
    }

    const tweenBezier = cc.tween(_target)
        .call(() => {
            _target.t = 0;
            const { x, y } = node;
            bezierX = [x, ...positions.map(p => p.x)];
            bezierY = [y, ...positions.map(p => p.y)];
        })
        .to(duration, { t: 1 }, _options)
        .start();

    return tweenBezier;
}

export function bezierBy(node, duration, positions, option = {}) {
    const _target = { t: 0 };
    let bezierX, bezierY;
    
    option.progress = (start, end, current, ratio) => {
        const { t } = _target;
        node.x = bezier(bezierX, t);
        node.y = bezier(bezierY, t);
        return start + (end - start) * ratio;
    }

    const tweenBezier = cc.tween(_target)
        .call(() => {
            _target.t = 0;
            const { x, y } = node;
            let _x = x, _y = y;
            bezierX = [x, ...positions.map(p => _x += p.x)];
            bezierY = [y, ...positions.map(p => _y += p.y)];
        })
        .to(duration, { t: 1 }, option)
        .start();

    return tweenBezier;
}

/**
 * @only for web
 * @example exportDataFile({"speed":10}, config.json);
 */
export function exportDataFile(dataStr, fileName) {
    let type = fileName.split(".").pop();
    const dataUri = `data:application/${type};charset=utf-8,${encodeURIComponent(dataStr)}`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', fileName);
    linkElement.click();
}

/**
 * @only for web
 * @example importDataFile((result)=> {console.log(result)});
 */
export function importDataFile(callback) {
    const input = window.document.createElement("input");
    input.type = "file";
    document.body.appendChild(input);
    setTimeout(() => {
        input.click();
    }, 500);
    input.onchange = () => {
        const selectedFile = input.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            console.log("file loaded", event.target.result);
            callback(event.target.result);
        };
        reader.readAsText(selectedFile);
    }
}


module.exports = {
    getWorldScale,
    bezierTo,
    bezierBy,
    bezier,
    exportDataFile,
    importDataFile
};