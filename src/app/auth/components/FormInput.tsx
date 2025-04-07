import { Control } from 'react-hook-form'
import EmailInput from '../../../components/ui/EmailInput'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../../../components/ui/form'
import { TBaseFields } from './AuthForm'
import PasswordInput from './PasswordInput'

interface AuthFormInputProps {
	name: TBaseFields
	label: string
	control: Control
}

const FormInput = ({ name, label, control }: AuthFormInputProps) => (
	<FormField
		control={control}
		name={name}
		render={({ field }) => (
			<FormItem>
				{name === 'email' && <FormLabel>{label}</FormLabel>}
				<FormControl>
					{name === 'email' ? (
						<EmailInput
							{...field}
							value={field.value || ''}
						/>
					) : (
						<PasswordInput
							{...field}
							forgotBtn={name === 'password'}
							labelNode={<FormLabel>{label}</FormLabel>}
							value={field.value || ''}
						/>
					)}
				</FormControl>
				<FormMessage />
			</FormItem>
		)}
	/>
)

export default FormInput
