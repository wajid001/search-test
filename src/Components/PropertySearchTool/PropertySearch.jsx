import React,{useState} from "react";
import { Row, Col, Container, Button, Table } from "react-bootstrap";
import {FaCheck} from 'react-icons/fa'; 
import "./PropertySearch.scss";
import { useSelector,useDispatch } from "react-redux";
import { setSelectedType,handleSearch,setFilteredRecord } from '../../store/slices/searchSlice'
export const PropertySearch = () => {
  const [searchString,setSearchString]=useState('')
  const {types,selectedType,searchedRecords,records}=useSelector(state=>state.search)
  const dispatch=useDispatch()
  
  const handeChangeType=(id)=>{
    dispatch(setSelectedType(id))
  }

  const handleFormSubmit=(e)=>{
      e.preventDefault()
      dispatch(handleSearch(searchString))
  }

  return (
    <div>
      <Container className="navBarContainer">
        <Row>
          <Col md={{ span: 2, offset: 5 }} className="mt-3">
            Property Search Tool
          </Col>
        </Row>
      </Container>

      <Container md={{ span: 3, offset: 3 }}>
        <Row className="mt-3">
          <Col md={{ span: 3, offset: 3 }}>
            <h6>search</h6>
          </Col>
          <Row>
            <Col>
              <form className="d-flex align-items-center" onSubmit={handleFormSubmit}>
                <input
                  className="addressSearch"
                  type="search"
                  placeholder="Address"
                  aria-label="Search"
                  value={searchString}
                  onChange={(e)=>setSearchString(e.target.value)}
                />
                <Button
                type="submit"
                  class="search-btn"
                  style={{
                    border: "none",
                    background: "yellow",
                    color: "black",
                  }}
                >
                  Search
                </Button>
              </form>
            </Col>
          </Row>
        </Row>
        <Row>
          <Col className="mt-3" md={{ span: 3, offset: 3 }}>
            <h6>Selected properties</h6>
          </Col>
        </Row>
        <Container>
          <Row>
            <Col md={{ span: 9, offset: 3 }}>
              <Table hover size="sm" className="mt-3">
                <thead style={{background:'#a6a6a6'}}>
                  <tr>
                    <th>Address</th>
                    <th>Postcode</th>
                    <th>Number of rooms</th>
                    <th>Floor area(m²)</th>
                  </tr>
                </thead>
                <tbody style={{background:'#f2f2f2'}}>
                  {
                    records.filter(filteredRecord=>filteredRecord.checked===true).map(record=>
                      <tr key={record.id}>
                    <td>{record.address}</td>
                    <td>{record.postCode}</td>
                    <td>{record.rooms}</td>
                    <td>{record.area}</td>
                  </tr>)
                  }
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>

        <Row className="mt-3">
          <Col md={{ offset: 1 }}>
            <h6>Property types</h6>
          </Col>
          <Col md={{ span: 9 }}>
            <h6>Search results</h6>
          </Col>
        </Row>
        <Row>
          <Col md={{ offset: 1 }}>
            <div style={{background: 'rgb(242, 242, 242)'}} className='ps-3 pt-2 pb-2 d-flex flex-column'>
              {types.map(type=><span className={`${selectedType===type.id?'bold':''} type-text`} key={type.id} onClick={()=>handeChangeType(type.id)}>{type.text}</span>)}
            </div>
          </Col>
          <Col md={{ span: 9 }}>
            <Table hover size="sm" className="mt-3">
              <thead style={{background:'#a6a6a6'}}>
                <tr>
                  <th><FaCheck /></th> 
                  <th>Address</th>
                  <th>Postcode</th>
                  <th>Property type</th>
                  <th>Number of rooms</th>
                  <th>Floor area(m²)</th>
                </tr>
              </thead>
              <tbody>
                {
                  searchedRecords.filter(searchedRecord=>{
                    if(selectedType===0) return true
                    if(searchedRecord.type===selectedType) return true
                    }).map(record=><tr key={record.id}>
                    <td>
                      <input type={"checkbox"} checked={records.find(coreRecord=>coreRecord.id===record.id).checked} onChange={()=>dispatch(setFilteredRecord(record.id))}/>
                    </td>
                    <td>{record.address}</td>
                    <td>{record.postCode}</td>
                    <td>{types.find(type=>type.id===record.type).text}</td>
                    <td>{record.rooms}</td>
                    <td>{record.area}</td>
                  </tr>)
                }
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
