import axios from 'axios';
import moment from 'moment';

class EventLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
    };
  }
  componentWillMount() {
    this.fetchEvents();
  }
  fetchEvents(page = 1) {
    console.log('loading :', page);
    return new Promise((resolve, reject) => {
      axios.get(`${CONFIG.API_HOST}/event?page=${page}`).then(
        res => {
          this.setState({
            data: res.data,
            loading: false,
          });
          resolve();
        },
        err => {
          reject();
        }
      );
    });
  }
  handlePaginationClick(id, e) {
    e.preventDefault();
    if (id !== this.state.data.page) {
      this.fetchEvents(id);
    }
  }
  handleNextPageClick(e) {
    e.preventDefault();
    const page = parseInt(this.state.data.page);
    if (page < this.state.data.pages)
      this.fetchEvents(page + 1);
  }
  handlePreviousPageClick(e) {
    e.preventDefault();
    const page = parseInt(this.state.data.page);
    if (page > 1)
      this.fetchEvents(page - 1);
  }
  handleReloadClick(e) {
    e.preventDefault();
    if (!this.state.loading) {
      this.setState({
        loading: true,
      });
      this.fetchEvents();
    } else {
    }
  }
  render() {
    console.log('paint');
    const page = parseInt(this.state.data.page);
    const eventItems = this.state.data.docs && this.state.data.docs.map(event => {
      return (
        <tr key={event._id}>
          <td>{event.level}</td>
          <td>{event.event}</td>
          <td>{event.note}</td>
          <td>{moment(event.timestamp).format('YYYY-MM-DD HH:mm:ss')}</td>
        </tr>
      );
    });
    const paginationItems = [];
    for (let i = 1; i <= this.state.data.pages; i++) {
      paginationItems.push(
        <li key={i}>
          <a className={"pagination-link" + (this.state.data.page == i ? ' is-current': '')} aria-label={`show page ${i}`} onClick={(e) => this.handlePaginationClick(i, e)}>{i}</a>
        </li>
      )
    }
    return (
      <div className="monitor card">
        <header className="card-header">
          <p className="card-header-title">Event Log</p>
          <a
            href="#"
            className="card-header-icon"
            aria-label="more options"
            onClick={this.handleReloadClick.bind(this)}
          >
            <span className="icon">
              <i
                className={
                  'fas fa-sync-alt ' + (this.state.loading ? 'fa-spin' : '')
                }
                aria-hidden="true"
              />
            </span>
          </a>
        </header>
        <div className="card-content">
          <div className="content">
            <table className="table table is-striped table is-narrow table is-hoverable">
              <thead>
                <tr>
                  <th>Level</th>
                  <th>Event</th>
                  <th>Note</th>
                  <th>
                      Timestamp
                  </th>
                </tr>
              </thead>
              <tbody>{eventItems}</tbody>
            </table>
          </div>
          <nav className="pagination" role="navigation" aria-label="pagination">
            <a className="pagination-previous" disabled={!(page > 1)} onClick={(e) => this.handlePreviousPageClick(e)}>Previous</a>
            <a className="pagination-next" disabled={!(page < this.state.data.pages)} onClick={(e) => this.handleNextPageClick(e)}>Next page</a>
            <ul className="pagination-list">
              {paginationItems}
            </ul>
          </nav>
        </div>
        <footer className="card-footer" />
      </div>
    );
  }
}

export default EventLog;
