interface String {
    endsWith(searchString: string, position: number): boolean;
    format(): string;
}

interface Array<T> {
    moveup(index: number, by: number);
    moveDown(index: number, by: number);
    applyToAll(propertyName: string, value: any);
    isExist(propertyName: string, value: any);
    addIfNotExist(item: T, propertyName: string);
    removeItem (item: T, propertyName: string)
}

String.prototype.endsWith = function (searchString: string, position: number) {
    var subjectString = this.toString();
    if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
    }
    position -= searchString.length;
    var lastIndex = subjectString.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
}

String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] !== 'undefined' ? args[number] : match;
    });
};

Array.prototype.moveup = function (index, by) {
    var newIndex = index - (by || 1);
    if (newIndex <= -1) {
        newIndex = 0;
    }
    var selectedItem = this[index];
    this.splice(index, 1);
    this.splice(newIndex, 0, selectedItem);
};

Array.prototype.moveDown = function (index, by) {
    var newIndex = index + (by || 1);
    if (newIndex > this.length - 1) {
        newIndex = this.length - 1;
    }
    var selectedItem = this[index];
    this.splice(index, 1);
    this.splice(newIndex, 0, selectedItem);
};

Array.prototype.applyToAll = function (propertyName, value) {
    if (propertyName) {
        for (var i = 0; i < this.length; i++) {
            this[i][propertyName] = value;
        }
    }
};

Array.prototype.isExist = function (propertyName, value) {
    if (propertyName) {
        var i = this.length;
        while (i--) {
            if (this[i][propertyName] === value) {
                return i;
            }
        }
    }
    return -1;
};

Array.prototype.addIfNotExist = function (item, propertyName) {
    if (item && propertyName) {
        if (this.isExist(propertyName, item[propertyName]) < 0) {
            this.push(item);
        }
    }
};

Array.prototype.removeItem = function (item, propertyName) {
    if (item && propertyName) {
        var index = this.isExist(propertyName, item[propertyName]);
        if (index > -1) {
            this.splice(index, 1);
        }
    }

};