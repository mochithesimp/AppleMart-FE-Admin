import { useState } from "react";
import SettingSection from "./SettingSection";
import { HelpCircle, Plus } from "lucide-react";
import "./ConnectedAccounts.css";

interface Account {
	id: number;
	name: string;
	connected: boolean;
	icon: string;
}

const ConnectedAccounts: React.FC = () => {
	const [connectedAccounts, setConnectedAccounts] = useState<Account[]>([
		{ id: 1, name: "Google", connected: true, icon: "/google.png" },
		{ id: 2, name: "Facebook", connected: false, icon: "/facebook.svg" },
		{ id: 3, name: "Twitter", connected: true, icon: "/x.png" },
	]);

	const toggleConnection = (id: number) => {
		setConnectedAccounts((prevAccounts) =>
			prevAccounts.map((acc) => (acc.id === id ? { ...acc, connected: !acc.connected } : acc))
		);
	};

	return (
		<SettingSection icon={HelpCircle} title="Connected Accounts">
			{connectedAccounts.map((account) => (
				<div key={account.id} className="account">
					<div className="account__info">
						<img src={account.icon} alt={`${account.name} icon`} className="account__icon" />
						<span className="account__name">{account.name}</span>
					</div>
					<button
						className={`account__button ${account.connected ? "account__button--connected" : "account__button--disconnected"}`}
						onClick={() => toggleConnection(account.id)}
					>
						{account.connected ? "Connected" : "Connect"}
					</button>
				</div>
			))}
			<button className="account__add">
				<Plus size={18} className="account__add-icon" /> Add Account
			</button>
		</SettingSection>
	);
};

export default ConnectedAccounts;
