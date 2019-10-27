import React from 'react';
import Page, { View, Button, Input, Label, Colxx, Text,
	Table, Tr, Td, THead, TBody, TFoot, Title, IText
} from '../../Components/app/Page'
import { injectIntl} from 'react-intl';
import mouseTrap from "react-mousetrap";
import classnames from "classnames";
import { viewService } from '../../helpers/ajax/service'

import {Badge} from "reactstrap";

class ViewService extends Page {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			service: {},
		}
	}

	componentDidMount = async () => {
    try {
			const id = this.props.match.params.id
    	const service = await viewService(id)
			this.setState({service})
    } catch (e) {
			console.log({e});
    } finally {
			this.setState({isLoading: false})
    }
  }

	right = () => (
		<View className="col">
			<Button color="danger"
			size="lg"
			className="top-right-button col-md-6"
			onClick={this.function} >Delete</Button>
			<Button color="warning"
			size="lg"
			className="top-right-button col-md-6"
			onClick={this.function} >Modify</Button>
		</View>
	)

	TableActions = ({data, onView}) => (
		<View className="row">
			<Button color="danger"
					size="xs" className="col-md-4"
					onClick={this.function}>Delete</Button>
			<Button color="warning"
					size="xs" className="col-md-4"
					onClick={this.function}>Edit</Button>
			<Button color="success"
					size="xs" className="col-md-4"
					onClick={onView}>View</Button>
		</View>
	)

	Table = ({data, config, title}) => (
		<View className="col-md-6 text-center">
			<Title>{title}</Title>
			<Table>
				<THead>
					<Tr>
						{config.heads.map((head, i) => <Td key={i}>{head}</Td>)}
					</Tr>
				</THead>
				<TBody>
					{data && data.map((dt) =>
					<Tr key={`${dt[config.key]}`}>
						{config.fields.map((field, i) =>
							<Td key={i}>{typeof field === 'function' ? field(dt) : dt[field]}</Td>
						)}
					</Tr>)}
				</TBody>
			</Table>
		</View>
	)

	Status = ({status, hd, bg, head}) => <Colxx  className={classnames({[`bg-${bg}`]: !!bg})} sm={3}>
			{hd ? <Text className="text-center text-light text-large">{head}</Text>
			: <Text className="text-center text-light text-large">{status}</Text>}
		</Colxx>

	render = () => {
		const { service } = this.state
		console.log(this.props);
		const { service_metas, services, jobs_failed, jobs_on_hold, jobs_pending, jobs_completed } = service
		return (
			<this.Template
				pageName={ service.name || 'Service'}
				right={this.right}>
				<View className="col-sm-12">
					<this.Status bg="danger" hd head="Jobs Failed" />
					<this.Status bg="warning" hd head="Jobs On Hold" />
					<this.Status bg="info" hd head="Jobs Pending" />
					<this.Status bg="success" hd head="Jobs Completed" />
				</View>
				<View className="col-sm-12">
					<this.Status bg="danger" status={jobs_failed} />
					<this.Status bg="warning" status={jobs_on_hold} />
					<this.Status bg="info" status={jobs_pending} />
					<this.Status bg="success" status={jobs_completed} />
				</View>
				<View className="col-sm-12">
					<this.Table title={<IText id="sub-categories" />} data={services} config={{
						key: 'id', fields: [
							'name', 'price', 'charge', (service) => <this.TableActions onView={() => this.props.history.replace(`/services/${service.id}`)} data={service} />
						],
						heads: ['Name', 'Price', 'Charge', 'Actions']
					}} />

					<this.Table title="Properties" data={service_metas} config={{
						key: 'id', fields: ['name', 'rule', (meta) => <this.TableActions data={meta} />],
						heads: ['Name', 'Rules', 'Actions']
					}} />

					<this.Table title="Reserved" data={[]} config={{
						key: 'id', fields: [],
						heads: []
					}} />
				</View>
			</this.Template>
		);
	}
}

export default injectIntl(mouseTrap(ViewService))

// export default class View extends PureComponent {
// 	constructor(props) {
// 		super(props);
// 	}
//
// 	render() {
// 		return (
// 			<div></div>
// 		);
// 	}
// }
