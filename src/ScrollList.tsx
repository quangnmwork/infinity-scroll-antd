import { List } from 'antd'
import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useClubHistory } from './hooks/useClubHistory';

const ScrollList = () => {
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState(0)

  const { trigger, isMutating } = useClubHistory();

  const loadMoreData = () => {
    if (isMutating) {
      return;
    }
    trigger({ page })
      .then((body: any) => {
        setData([...data, body]);
        setPage(val => val + 1)
      })
      .catch(() => {
      });
  };

  React.useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 200,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 20000}
        loader={<p>Loading </p>}
        endMessage={<p>Nothing more</p>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item, id) => (
            <List.Item key={id} >
              <div> {JSON.stringify(item)}</div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>)
}

export default ScrollList