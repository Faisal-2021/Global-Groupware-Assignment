
import { User } from '@/types/user';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Edit, Mail, Trash2, User as UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface UserCardProps {
  user: User;
  onDelete: (id: number) => void;
  index: number;
}

const UserCard = ({ user, onDelete, index }: UserCardProps) => {
  const navigate = useNavigate();
  
  const handleEdit = () => {
    navigate(`/users/${user.id}/edit`);
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="w-full"
    >
      <Card className="overflow-hidden backdrop-blur-sm border-opacity-50 h-full transition-all duration-300 hover:shadow-lg">
        <div className="relative group">
          {/* Top gradient decoration */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          
          <div className="w-full h-32 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <Avatar className="h-20 w-20 border-4 border-white shadow-md">
              <AvatarImage 
                src={user.avatar} 
                alt={`${user.first_name} ${user.last_name}`}
              />
              <AvatarFallback className="bg-primary text-lg font-semibold text-primary-foreground">
                {getInitials(user.first_name, user.last_name)}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="absolute top-3 right-3 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button 
              size="icon"
              variant="secondary"
              onClick={handleEdit}
              className="h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white shadow-sm"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              size="icon"
              variant="destructive"
              onClick={() => onDelete(user.id)}
              className="h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-red-500 shadow-sm text-red-500 hover:text-white"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <CardContent className="p-5 flex flex-col items-center text-center">
          <h3 className="font-medium text-lg mt-2">{user.first_name} {user.last_name}</h3>
          
          <div className="flex items-center text-muted-foreground text-sm mt-1 mb-3">
            <Mail className="h-3 w-3 mr-1" />
            <span className="truncate max-w-[180px]">{user.email}</span>
          </div>

          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">
            <UserIcon className="h-3 w-3 mr-1" />
            Team Member
          </Badge>

          <div className="w-full mt-4 pt-4 border-t border-border/30">
            <Button
              variant="outline"
              size="sm"
              onClick={handleEdit}
              className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 group"
            >
              <span className="text-gray-700 group-hover:text-gray-900">View Profile</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UserCard;
