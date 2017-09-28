class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.config = config;
        this.state = config.initial;
        this.previous = null;
        this.next = null;
        
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) 
         this.config.states[state] == undefined ? throw error : this.previous = this.state; this.state = state;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (this.config.states[this.state].transitions[event] == undefined) { 
            throw error; 
        } else {

            this.previous = this.state;
            this.state = this.config.states[this.state].transitions[event];

        }
    
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {this.state = this.config.initial;}

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        
        this.statesArray = [];
                if (event != undefined) {
            for (var key in this.config.states) { 
                if (this.config.states[key].transitions.hasOwnProperty(event)) { 
                    this.statesArray.push(key); 
                }
            }
        }

        else { 
            for (var key in this.config.states) {                 
                    this.statesArray.push(key); 
                }
        }
        return this.statesArray;
            
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
         if (this.previous == null) { 
            return false; 
        }
        else {
            this.next = this.state;
            this.state = this.previous;
            this.previous = null;
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.next == null) {
            return false;
        }

        else {
            this.previous = this.state;
            this.state = this.next;
            this.next = null;
            return true;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {  
        this.previous = null;
        this.next = null;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
