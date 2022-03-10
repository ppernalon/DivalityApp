import React, {useEffect, useState} from 'react'
import {View} from 'react-native'
import {ActivityIndicator, Button, DataTable, IconButton, Modal, Text, TextInput} from 'react-native-paper'
import {colors} from 'GlobalStyle'

type DataTableDivalityProps = {
    nameToFilter?: string[]
    isDataLoad: boolean
    data: []
    header: [{name: string; type: string; width: number; nameOfTheData: string; action?: Function}]
}

const DataTableDivality = ({nameToFilter = ['',''], isDataLoad, data, header}: DataTableDivalityProps) => {
    const [dataFilter, setDataFilter] = useState<[]>([])
    const [dataFilterByPage, setDataFilterByPage] = useState<[]>([])
    const [page, setPage] = useState<number>(0)
    const numberOfItemsPerPageList = [2, 5, 10]
    const [numberOfItemsPerPage, setNumberOfItemsPerPage] = React.useState(numberOfItemsPerPageList[1])
    const fromPagination = page * numberOfItemsPerPage
    const toPagination = Math.min((page + 1) * numberOfItemsPerPage, dataFilter.length)
    useEffect(() => {
        filterData()
    }, [numberOfItemsPerPage, nameToFilter[0], isDataLoad, data])

    const filterData = () => {
        setPage(0)
        let dataFilterTemp: any = data
        if (nameToFilter[0] !== '') {
            dataFilterTemp = data.filter((item: any) => item[nameToFilter[1]].includes(nameToFilter[0]))
        }
        setDataFilter(dataFilterTemp)
        const dataFilterByPageTemp: any = dataFilterTemp.slice(page * numberOfItemsPerPage, (page + 1) * numberOfItemsPerPage)
        setDataFilterByPage(dataFilterByPageTemp)
    }
    const filterByPage = (page: number) => {
        setPage(page)
        const dataFilterTemp: any = dataFilter.slice(page * numberOfItemsPerPage, (page + 1) * numberOfItemsPerPage)
        setDataFilterByPage(dataFilterTemp)
    }

    const renderItem = (rowDataJSON: JSON, index: number) => {
        return (
            <DataTable.Row key={index}>
                {header.map((headerJSON, indexColumn) => {
                    switch (headerJSON.type) {
                        case 'string':
                            return (
                                <DataTable.Cell style={{flex: headerJSON.width, justifyContent: 'center'}} key={indexColumn}>
                                    {rowDataJSON[headerJSON.nameOfTheData]}
                                </DataTable.Cell>
                            )
                        case 'icon':
                            return (
                                <DataTable.Cell style={{flex: headerJSON.width, justifyContent: 'center'}} key={indexColumn}>
                                    <IconButton
                                        onPress={headerJSON.action ? () => headerJSON.action(rowDataJSON) : () => console.log('error missing action')}
                                        icon={headerJSON.nameOfTheData}
                                        hasTVPreferredFocus={undefined}
                                        tvParallaxProperties={undefined}
                                        color={colors.blueSky}
                                    />
                                </DataTable.Cell>
                            )
                        case 'iconDefy':
                            return (
                                <DataTable.Cell style={{flex: headerJSON.width, justifyContent: 'center'}} key={indexColumn}>
                                    {rowDataJSON['status'] === 'connected' ? (
                                        <IconButton
                                            onPress={headerJSON.action ? () => headerJSON.action(rowDataJSON) : () => console.log('error missing action')}
                                            icon={headerJSON.nameOfTheData}
                                            hasTVPreferredFocus={undefined}
                                            tvParallaxProperties={undefined}
                                            color={colors.blueSky}
                                        />
                                    ) : (
                                        <></>
                                    )}
                                </DataTable.Cell>
                            )
                            case 'iconDelete':
                                return (
                                    <DataTable.Cell style={{flex: headerJSON.width, justifyContent: 'center'}} key={indexColumn}>
                                        {rowDataJSON['status'] !== 'request' ? (
                                            <IconButton
                                                onPress={headerJSON.action ? () => headerJSON.action(rowDataJSON) : () => console.log('error missing action')}
                                                icon={headerJSON.nameOfTheData}
                                                hasTVPreferredFocus={undefined}
                                                tvParallaxProperties={undefined}
                                                color={colors.blueSky}
                                            />
                                        ) : (
                                            <></>
                                        )}
                                    </DataTable.Cell>
                                )
                        case 'isConnected':
                            if (rowDataJSON[headerJSON.nameOfTheData] === 'request') {
                                return (
                                    <DataTable.Cell style={{flex: headerJSON.width, justifyContent: 'center'}} key={indexColumn}>
                                        <View style={{flexDirection: 'row', height: '100%', width:'60%', justifyContent: "center", alignItems:'center'}}>
                                            <IconButton
                                                onPress={
                                                    headerJSON.action ? () => headerJSON.action(rowDataJSON, true) : () => console.log('error missing action')
                                                }
                                                style={{margin: 0, padding: 0}}
                                                icon={'check-circle-outline'}
                                                hasTVPreferredFocus={undefined}
                                                tvParallaxProperties={undefined}
                                                color={colors.blueSky}
                                                size={20}
                                            />
                                            <IconButton
                                                onPress={
                                                    headerJSON.action ? () => headerJSON.action(rowDataJSON, false) : () => console.log('error missing action')
                                                }
                                                style={{margin: 0, padding: 0}}
                                                icon={'close-circle-outline'}
                                                hasTVPreferredFocus={undefined}
                                                tvParallaxProperties={undefined}
                                                color={colors.blueSky}
                                                size={20}
                                            />
                                        </View>
                                    </DataTable.Cell>
                                )
                            }
                            if (rowDataJSON[headerJSON.nameOfTheData] === 'connected') {
                                return (
                                    <DataTable.Cell style={{flex: headerJSON.width, justifyContent: 'center'}} key={indexColumn}>
                                        <IconButton
                                            onPress={
                                                rowDataJSON[headerJSON.nameOfTheData] === 'request'
                                                    ? () => headerJSON.action(rowDataJSON)
                                                    : () => console.log('error missing action')
                                            }
                                            icon={'account-circle'}
                                            hasTVPreferredFocus={undefined}
                                            tvParallaxProperties={undefined}
                                            color={colors.green}
                                        />
                                    </DataTable.Cell>
                                )
                            } else if (rowDataJSON[headerJSON.nameOfTheData] === 'disconnected') {
                                return (
                                    <DataTable.Cell style={{flex: headerJSON.width, justifyContent: 'center'}} key={indexColumn}>
                                        <IconButton
                                            onPress={() => {}}
                                            icon={'account-circle'}
                                            hasTVPreferredFocus={undefined}
                                            tvParallaxProperties={undefined}
                                            color={colors.greyInactive}
                                        />
                                    </DataTable.Cell>
                                )
                            }

                        default:
                            return (
                                <DataTable.Cell style={{flex: headerJSON.width, justifyContent: 'center'}} key={indexColumn}>
                                    {rowDataJSON[headerJSON.nameOfTheData]}
                                </DataTable.Cell>
                            )
                    }
                })}
            </DataTable.Row>
        )
    }

    return (
        <View>
            <DataTable style={{width: '80%'}}>
                <DataTable.Header>
                    {header.map((headerJSON, indexHeader) => (
                        <DataTable.Title style={{flex: headerJSON.width, justifyContent: 'center'}} key={indexHeader}>
                            {headerJSON.name}
                        </DataTable.Title>
                    ))}
                </DataTable.Header>
                {!isDataLoad ? <ActivityIndicator animating={!false} color={colors.blueSky} size={'large'} style={{marginVertical: 30}} /> : <></>}
                {Object.keys(dataFilterByPage).length !== 0 && isDataLoad ? dataFilterByPage.map((item, index) => renderItem(item, index)) : <></>}
                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(dataFilter.length / numberOfItemsPerPage)}
                    onPageChange={(page) => filterByPage(page)}
                    label={`${page + 1} sur ${Math.ceil(dataFilter.length / numberOfItemsPerPage)}`}
                    numberOfItemsPerPageList={numberOfItemsPerPageList}
                    numberOfItemsPerPage={numberOfItemsPerPage}
                    onItemsPerPageChange={setNumberOfItemsPerPage}
                    showFastPaginationControls
                    selectPageDropdownLabel={'Lignes par page'}
                />
            </DataTable>
        </View>
    )
}

export default DataTableDivality
