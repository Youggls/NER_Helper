(function () {
    const PERSON = 'PERSON';
    const LOCATION = 'LOCATION';
    const ORGANIZATION = 'ORGANIZATION';
    const TIME = 'TIME';
    const OUT = 'O';
    const BEGIN = 'B_';
    const MIDDLE = 'M_';
    const END = 'E_';
    const B_P = 1;
    const M_P = 3;
    const E_P = 5;
    const B_L = 7;
    const M_L = 9;
    const E_L = 11;
    const B_O = 13;
    const M_O = 15;
    const E_O = 17;
    const B_T = 19;
    const M_T = 21;
    const E_T = 23;
    let textData = '';
    let arrayData = [];
    let fileName = '';
    $('#upload-btn').click(function () {
        clearAll();
        console.log('upload');
        $('#files').click();
    });
    $('#files').change(function () {
        readFile();
    });
    $('#clear-btn').click(function () {
        let result = confirm('确认清空吗？请事先保存！');
        if (result === true) clearAll();
    });
    $('#save-btn').click(function() {
        if (arrayData.length === 0) alert('没有输入文件！');
        else saveFile();
    })
    function clearAll() {
        textData = '';
        arrayData = [];
        $('#table-body').children('tr').remove();
    };
    function clickLabel(element) {
        console.log('click label');
        let line = element.getAttribute('line');
        $('[line="' + line + '"]').attr('class', 'badge badge-pill badge-light');
        element.setAttribute('class', 'badge badge-pill badge-success');
        let id = element.getAttribute('id');
        let text = '';
        if (id.indexOf('b') !== -1) text += BEGIN;
        else if (id.indexOf('e') !== -1) text += END;
        else if (id.indexOf('m') !== -1) text += MIDDLE;
        if (id.indexOf('p') !== -1) text += PERSON;
        else if (id.indexOf('l') !== -1) text += LOCATION;
        else if (id.indexOf('or') !== -1) text += ORGANIZATION;
        else if (id.indexOf('t') !== -1) text += TIME;
        if (text === '') text = 'O';
        $('#label-' + line).text(text);
        arrayData[line][1] = text;
    }
    function readFile() {
        console.log('read file');
        let selectedFile = document.getElementById("files").files[0];
        fileName = selectedFile.name;
        let reader = new FileReader();
        reader.readAsText(selectedFile);
        reader.onload = function () {
            textData = this.result;
            if (textData !== '') {
                handleTextData();
                showTableContent();
                $('a').click(function () {
                    clickLabel(this);
                });
            }
            else alert('文件为空')
        }
    };
    function saveFile() {
        let saveTextData = '';
        for (let i = 0; i < arrayData.length; i++) {
            if (arrayData[i][1] !== undefined) saveTextData += arrayData[i][0] + ' ' + arrayData[i][1] + '\n';
            else saveTextData += '\n';
        }
        let file = new Blob([saveTextData], {type: 'text/plain;charset=utf-8'});
        saveAs(file, fileName);
    }
    function handleTextData() {
        let lines = textData.split('\n');
        console.log('handle file');
        for (let i = 0; i < lines.length; i++) {
            let single_line = lines[i].split(' ');
            arrayData.push(single_line);
        }
    };
    function showTableContent() {
        for (let i = 0; i < arrayData.length; i++) {
            let tableBody = $('#table-body');
            let row = $('<tr id=\"' + i + '\"></tr>');
            let flag = 0;
            if (arrayData[i][1] !== undefined) {
                if (arrayData[i][1].indexOf(BEGIN) !== -1) {
                    flag += 0;
                } else if (arrayData[i][1].indexOf(MIDDLE) !== -1) {
                    flag += 2;
                } else if (arrayData[i][1].indexOf(END) !== -1) {
                    flag += 4;
                }

                if (arrayData[i][1].indexOf(PERSON) !== -1) {
                    flag += 1
                } else if (arrayData[i][1].indexOf(LOCATION) !== -1) {
                    flag += 7;
                } else if (arrayData[i][1].indexOf(ORGANIZATION) !== -1) {
                    flag += 13;
                } else if (arrayData[i][1].indexOf(TIME) !== -1) {
                    flag += 19;
                }
            }
            row.append('<th scope="row">' + i + '</th>');
            row.append('<td>' + arrayData[i][0] + '</td>');
            row.append('<td id="label-' + i + '">' + arrayData[i][1] + '</td>');
            if (arrayData[i][1] === undefined) {
                tableBody.append(row);
                continue;
            }
            let person = $('<td></td>');
            person.append('<a id="bp-' + i + '" class="badge badge-pill badge-light" line="' + i + '">BEGIN</a>');
            person.append('<a id="mp-' + i + '" class="badge badge-pill badge-light" line="' + i + '">MIDDLE</a>');
            person.append('<a id="ep-' + i + '" class="badge badge-pill badge-light" line="' + i + '">END</a>');
            row.append(person);
            let location = $('<td></td>');
            location.append('<a id="bl-' + i + '" class="badge badge-pill badge-light" line="' + i + '">BEGIN</a>');
            location.append('<a id="ml-' + i + '" class="badge badge-pill badge-light" line="' + i + '">MIDDLE</a>');
            location.append('<a id="el-' + i + '" class="badge badge-pill badge-light" line="' + i + '">END</a>');
            row.append(location);
            let organization = $('<td></td>');
            organization.append('<a id="bor-' + i + '" class="badge badge-pill badge-light" line="' + i + '">BEGIN</a>');
            organization.append('<a id="mor-' + i + '" class="badge badge-pill badge-light" line="' + i + '">MIDDLE</a>');
            organization.append('<a id="eor-' + i + '" class="badge badge-pill badge-light" line="' + i + '">END</a>');
            row.append(organization);
            let time = $('<td></td>');
            time.append('<a id="bt-' + i + '" class="badge badge-pill badge-light" line="' + i + '">BEGIN</a>');
            time.append('<a id="mt-' + i + '" class="badge badge-pill badge-light" line="' + i + '">MIDDLE</a>');
            time.append('<a id="et-' + i + '" class="badge badge-pill badge-light" line="' + i + '">END</a>');
            row.append(time);
            let o = $('<td></td>');
            o.append('<a id="o-' + i + '" class="badge badge-pill badge-light" line="' + i + '">O</a>');
            row.append(o);
            tableBody.append(row);
            if (flag === B_P) $('#bp-' + i).attr('class', 'badge badge-pill badge-success');
            else if (flag === M_P) $('#mp-' + i).attr('class', 'badge badge-pill badge-success');
            else if (flag === E_P) $('#ep-' + i).attr('class', 'badge badge-pill badge-success');
            else if (flag === B_L) $('#bl-' + i).attr('class', 'badge badge-pill badge-success');
            else if (flag === M_L) $('#ml-' + i).attr('class', 'badge badge-pill badge-success');
            else if (flag === E_L) $('#el-' + i).attr('class', 'badge badge-pill badge-success');
            else if (flag === B_O) $('#bor-' + i).attr('class', 'badge badge-pill badge-success');
            else if (flag === M_O) $('#mor-' + i).attr('class', 'badge badge-pill badge-success');
            else if (flag === E_O) $('#eor-' + i).attr('class', 'badge badge-pill badge-success');
            else if (flag === B_T) $('#bt-' + i).attr('class', 'badge badge-pill badge-success');
            else if (flag === M_T) $('#mt-' + i).attr('class', 'badge badge-pill badge-success');
            else if (flag === E_T) $('#et-' + i).attr('class', 'badge badge-pill badge-success');
            else if (flag === 0) $('#o-' + i).attr('class', 'badge badge-pill badge-success');
        }
    }
})();