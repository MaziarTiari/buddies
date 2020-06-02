import { Component } from "react";
import { ApiClient } from "./ApiClient";


interface DbDataProps {
    baseUrl: string;
    limit?: number;
    itemPath?: string;
}

type DbDataState<T> = {
    isLoading: boolean;
    items: T[]
}
export default class DbData<T> extends Component<DbDataProps, DbDataState<T>> {
    private readonly ApiClient = new ApiClient<T>({ baseURL: this.props.baseUrl });

    componentDidMount() {
      this.loadData();
    }
  
    loadData = async () => {
      this.setState(() => ({
        isLoading: true
      }));
  
      const { limit } = this.props;
  
        await this.ApiClient.Get<T[]>(this.props.itemPath)
        .then(res => {
            if(res.data) {
                this.setState({isLoading: false, items: res.data})
            }
            else if(res.error) {
                this.setState({isLoading: false})
            }
        }).catch(err => this.setState({isLoading: false}))
    };
  
    render() {
      const { isLoading, items } = this.state;
      const { children } = this.props;
      
      if (typeof children !== "function") {
        return null;
      }
  
      return children({
        isLoading, 
        items, 
        loadData: this.loadData 
      });
    }
  }