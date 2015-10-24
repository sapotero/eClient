console.log('user loaded!');

var user = {
    userId: 10,
    
    config: {
        useCaching: true,
        language: 'ru'
    },
    // Очень простой метод
    getId: function() {
        console.log('user -> userId=' + this.userId);
    },
    // Очень простой метод
    getById: function() {
        console.log('user -> getById');
    },
    // вывод значения заданного в конфигурации
    getAll: function() {
        console.log('user -> getAll : useCaching ' + ((this.config.useCaching) ? 'enabled' : 'disabled'));
    },
    // переопределение конфигурации
    reconfigure: function(config) {
        if (typeof config == 'object') {
            this.config = config;
            console.log(this.config.language); 
        }
    }
};