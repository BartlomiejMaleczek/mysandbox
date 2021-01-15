const proto = {
    add(className) {
        if (typeof className === 'string') {
            this[className] = true;
        } else {
            Object.assign(this, className);
        }
        return this;
    },
    invert() {
        Object.keys(this).forEach(key => {
            this[key] = !this[key];
        });
        return this;
    },
    toString() {
        return Object.keys(this)
            .filter(key => this[key])
            .join(' ');
    }
};

export function set(config) {
    let _config = config;

    if (typeof config === 'string') {
        const key = config;
        _config = {};
        _config[key] = true;
    }
    return Object.assign(Object.create(proto), _config);
}

export function listMutation(classList, config) {
    Object.keys(config).forEach(key => {
        if (typeof key === 'string' && key.length) {
            if (config[key]) {
                classList.add(...key.split(' '));
            } else {
                classList.remove(...key.split(' '));
            }
        }
    });
}