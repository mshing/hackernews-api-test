import React from 'react';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getNews } from '../modules/hackernews';
import { CSSTransition } from 'react-transition-group';

import ListItem from '../components/listItem';
import Pager from '../components/pager';

class Home extends React.Component {
    constructor(props, context) {
        super(props, context);

        let type = this.getType(props.location.pathname);

        this.state = {
            page:1, 
            itemsPerPage:30,
            errors:'',
            type:type,
            listVisible:false
        };
        
        this.changePage = this.changePage.bind(this);

        this.getNews(1,type);        
    }
    componentWillMount() {
        this.unlisten = this.props.history.listen((location, action) => {
            
            let type = this.getType(location.pathname);
            this.getNews(1,type);
        });
    }
    componentWillUnmount() {
        this.unlisten();
    }

    getType(path) {
        let type = path.toLowerCase().replace('/','').replace('jobs','job') + 'stories'
        
        return type === 'stories' ? 'topstories' : type;
    }

    getNews(page,type) {
        
        this.setState({
            page,
            type,
            listVisible:false
        });
        this.props.getNews({
            page,
            type,
            itemsPerPage:this.state.itemsPerPage,
        }).then(()=> {
            this.setState({listVisible:true});
        });
    }

    changePage(e) {
        let page = this.state.page;

        if(e !== undefined) {
            e.preventDefault();

            let dataPage = e.target.getAttribute("data-page");
            let pageCount = this.props.total ? Math.ceil(this.props.total / this.state.itemsPerPage) : 1;

            if(dataPage === 'next') {
                page += 1;
            } else if (dataPage === 'prev') {
                page -= 1;
            } else {
                page = 1;
            }
            
            if(page > pageCount) page = pageCount;
            if(page < 1) page = 1;

            if(page !== this.state.page) {
                this.getNews(page,this.state.type);
            }
        }

    }
    render() {
        return (
            <div className="home">
                {this.props.items && this.props.items.length > 0 && this.props.total && 
                    <Pager page={this.state.page} itemCount={this.props.total} clickAction={this.changePage} itemsPerPage={this.state.itemsPerPage} />
                    }
                <div className="list">
                <CSSTransition classNames="page-transition" in={this.state.listVisible} timeout={5000}>
                    <ul key={0}>
                        {this.props.items && this.props.items.map((listItem, i) =>
                           <ListItem key={listItem.id} listItem={listItem}  />
                       )}
                    </ul>
                    </CSSTransition>
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => ({
    items: state.hackernews.items,
    total: state.hackernews.total
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getNews,
    changePage: () => push('/about-us')
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home));
