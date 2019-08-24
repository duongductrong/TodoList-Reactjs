import React, { Component } from 'react';
import TodoItems from './components/TodoItems.js'
import CheckList from './images/checklist.svg'
import NextImg from './images/nextimg.svg'
import PreImg from './images/preimg.svg'
import TrashImg from './images/trash.svg'
import SortImg from './images/sortimg.svg'
import FacebookImg from './images/facebook.svg'
import InstagramImg from './images/instagram.svg'
import './App.css';

const title = "Todo Lists";

let onPage;
//Responsive with screen
if(window.screen.width > 515) {
    onPage = 6;
}
if(window.screen.width <= 515) {
    onPage = 4;
}

class App extends Component {
    constructor() {
        super();
        this.StorageWorks = this.StorageWorks.bind(this);
        this.state = {
            todolists: JSON.parse(this.StorageWorks()) || [],
            value: '',
            defaultCompleted: false,
            page: this.getPage() || 1,
            reset: false
        }
        
        //Bind this.function
        this.addTodoItem = this.addTodoItem.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.done = this.done.bind(this);
        this.isAll = this.isAll.bind(this);
        this.isCheckCompleted = this.isCheckCompleted.bind(this);
        this.isActive = this.isActive.bind(this);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.clearStorageData = this.clearStorageData.bind(this);
        this.sortData = this.sortData.bind(this);
    }
    
    //write data to storage 
    writeStorage(storage) {
        localStorage.setItem("todolists", JSON.stringify(storage));
    }

    //get number page
    getPage() {
        this.page = localStorage.getItem("page");
        if(this.page === "") {
            localStorage.setItem("page", JSON.stringify(1));
            return 1;
        }
        this.page = JSON.parse(this.page);
        if(this.page !== null && this.page !== undefined) {
            return this.page;
        }
        else {
            localStorage.setItem("page", JSON.stringify(1));
            return 1;
        }
    }

    //check storage have the data or null
    StorageWorks() {
        if(typeof(Storage) !== undefined && window.localStorage.length > 0 && localStorage.getItem("todolists")) {
            return localStorage.getItem("todolists");
        }
        else {
            localStorage.setItem("todolists", JSON.stringify([]))
            return JSON.stringify([]); //JSON.Stringify
        }
    }

    //the handling checking of user
    handlingWork(item, location) {
        const todolists = JSON.parse(localStorage.getItem("todolists"));
        
        return () => {
            this.setState({
                todolists: todolists.map((val,index) => {
                    if(val.name === item.name && index === location) {
                        val.isCompleted = !val.isCompleted;
                    }
                    else {
                        val.isCompleted = val.isCompleted;
                    }
                    return val;
                })
            });
            this.writeStorage(todolists);
        }
    }
    
    //Add a new work for list
    addTodoItem(event) {
        let storage = [];
        let lists = [];

        if(event.keyCode === 13 && event.target.value !== "") {
            if(localStorage.getItem("todolists") !== null) {
                lists = [...JSON.parse(localStorage.getItem("todolists"))];
            }
            if(lists.length > 0) {
                storage = [...lists];
            }
            this.item =  {name: event.target.value, isCompleted: false};
            storage = [this.item, ...storage];
            this.setState({
                todolists: storage,
                value: ""
            });
            
            this.writeStorage(storage);
        }
    }
    onChangeInput(event) {
        this.setState({value: event.target.value});
    }

    //Check all done
    done() {
        this.disk = JSON.parse(localStorage.getItem("todolists"));
        
        this.storage = this.disk.map((item) => {
            item.isCompleted = !this.state.defaultCompleted;
            return item;
        });
        
        this.setState({
            todolists: this.storage,
            defaultCompleted: !this.state.defaultCompleted
        })
        this.writeStorage(this.storage);
    }

    //Convert list todo
    sortData() {
        this.storage = JSON.parse(localStorage.getItem("todolists"));
        this.reverse = this.storage.reverse();
        this.setState({
            todolists: this.reverse
        });
        
        this.writeStorage(this.reverse)
    }
    //Delete
    deletedItem(item, index) {
        return() => {
            this.storage = [...this.state.todolists];
            this.storage.splice(index, 1);
            this.setState({
                todolists: this.storage
            })

            this.writeStorage(this.storage);
        }
    }
    //Showall
    isAll() {
        this.completed = JSON.parse(localStorage.getItem("todolists"));
        this.setState({
            todolists: this.completed
        })
    }
    //Show completed
    isCheckCompleted() {
        this.storage = JSON.parse(localStorage.getItem("todolists"));
        this.valueCompleted = [];
        this.storage.map((val) => {
            if(val.isCompleted === true) {
                this.valueCompleted.push(val);
            }
        })
        this.setState({
            todolists: this.valueCompleted
        })
    }
    //show data activing
    isActive() {
        this.storage = JSON.parse(localStorage.getItem("todolists"));
        this.valueActive = [];
        this.storage.map((val) => {
            if(val.isCompleted === false) {
                this.valueActive.push(val);
            }
        })
        this.setState({
            todolists: this.valueActive
        })
    }

    //next page
    next() {
        if(this.state.page < Math.ceil(this.state.todolists.length/onPage)) {
            this.setState({
                page: ++this.state.page
            });
        }
        localStorage.setItem("page", this.state.page);
    }

    //previous page
    previous() {
        if(this.state.page > 1) {
            this.setState({
                page: --this.state.page
            });
        }
        localStorage.setItem("page", this.state.page);
    }
    
    //clear all data in storage
    clearStorageData() {
        localStorage.clear();
        this.empty = []

        this.setState({
            todolists: this.empty
        });
        localStorage.setItem("todolists", JSON.stringify(this.empty));
    }

    render() {
        var { todolists, value } = this.state;
        //Pagination list
        this.start = (this.state.page - 1) * onPage;
        this.end = (this.state.page - 1) * onPage + onPage;
        todolists = todolists.slice(this.start, this.end);
        
        return (
            <div className="App">
                <header className="header">
                    <h1 className="header__title">{title}</h1>
                    <ul className="header__select">
                        <li><button onClick={this.isAll} className="header__option">All</button></li>
                        <li><button onClick={this.isActive} className="header__option">Active</button></li>
                        <li><button onClick={this.isCheckCompleted} className="header__option">Completed</button></li>
                    </ul>
                </header>
                
                <section className="todo-lists">
                    <div className="todo-lists__processingType">
                        <img onClick={this.done} className="todo-lists__processingType__image" title="Check all" src={CheckList} />
                        <span className="todo-lists__note">Đảo ngược</span>
                        <input 
                            className="todo_lists__type" 
                            type="text" 
                            placeholder="Add task . . ."
                            value={value}
                            onChange={this.onChangeInput}
                            onKeyUp={this.addTodoItem}
                            maxLength="60"
                        />
                        <img onClick={this.sortData} className="todo-lists__sort" src={SortImg} title="Đảo ngược" />
                        <span className="todo-lists__note">Đảo ngược</span>
                    </div>

                    { todolists.length > 0 && todolists.map((val, index) => 
                        <TodoItems 
                            key={index} 
                            items={val} 
                            clickedItem={this.handlingWork(val, ((this.state.page - 1) * 6) + index)} 
                            deletedItem={this.deletedItem(val, ((this.state.page - 1) * 6) + index)}
                        />)
                    }
                    {
                        todolists.length === 0 && <div className="todo-lists__no-work">No work has been added yet</div>
                    }
                </section>
                <footer className="footer">
                    <div className="pagination">
                        <img onClick={this.previous} className="pagination__pre" src={PreImg}/>
                        <button className="pagination__page">{this.state.page}</button>
                        <img onClick={this.next} className="pagination__next" src={NextImg}/>
                    </div>
                    <div className="clear-todolists">
                        <span className="clear-todolists__text">Cle
                            <img onClick={this.clearStorageData} className="clear-todolists__trash"title="clear data" src={TrashImg} />
                        ar</span>
                    </div>
                    <div className="the-page">
                        {`${this.state.page}/${Math.ceil(this.state.todolists.length/onPage)}`}
                    </div>
                    <div className="mysocial">
                        <a href="https://www.facebook.com/trong.duong.77398" target="_blank"><img className="mysocial__img" src={FacebookImg} /></a>
                        <a href="https://www.instagram.com/duongductrong06/" target="_blank"><img className="mysocial__img" src={InstagramImg} /></a>
                    </div>
                </footer>
            </div>
        )
  }
}

export default App;